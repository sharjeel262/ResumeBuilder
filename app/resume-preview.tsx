import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import ResumeTemplate1 from '../components/ResumeTemplate1';
import ResumeTemplate2 from '../components/ResumeTemplate2';
import ResumeTemplate3 from '../components/ResumeTemplate3';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { supabase } from '../services/supabaseClient';

export default function ResumePreviewScreen() {
  const { resume_id, template = 'classic' } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [exportType, setExportType] = useState<'share' | 'save'>('share');
  
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  useEffect(() => {
    const fetchData = async () => {
      if (!resume_id) return;
      try {
        const [resumeRes, educationRes, skillsRes, projectsRes, otherSkillsRes, experienceRes] = await Promise.all([
          supabase.from('resumes').select('*').eq('id', resume_id).single(),
          supabase.from('education').select('*').eq('resume_id', resume_id),
          supabase.from('skills').select('*').eq('resume_id', resume_id),
          supabase.from('projects').select('*').eq('resume_id', resume_id),
          supabase.from('other_skills').select('*').eq('resume_id', resume_id),
          supabase.from('experience').select('*').eq('resume_id', resume_id),
        ]);

        setData({
          resume: resumeRes.data,
          education: educationRes.data,
          skills: skillsRes.data,
          projects: projectsRes.data,
          otherSkills: otherSkillsRes.data,
          experience: experienceRes.data,
        });
        
        // Set default filename based on resume name
        if (resumeRes.data?.name) {
          setFileName(`${resumeRes.data.name.replace(/[^a-zA-Z0-9]/g, '_')}_Resume`);
        } else {
          setFileName('My_Resume');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resume_id]);

  const generatePDF = async () => {
    if (!data) return null;
    try {
      const html = generateResumeHTML(data, template as string);
      const { uri } = await Print.printToFileAsync({ html });
      return uri;
    } catch (e) {
      throw new Error('Failed to generate PDF');
    }
  };

  const handleSharePDF = async () => {
    setPdfLoading(true);
    try {
      const uri = await generatePDF();
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to share PDF.');
    }
    setPdfLoading(false);
  };

  const handleSavePDF = async () => {
    if (!fileName.trim()) {
      Alert.alert('Error', 'Please enter a file name.');
      return;
    }

    setPdfLoading(true);
    try {
      const uri = await generatePDF();
      if (uri) {
        const documentsDir = FileSystem.documentDirectory;
        const finalFileName = `${fileName.trim()}.pdf`;
        const destinationUri = `${documentsDir}${finalFileName}`;
        
        await FileSystem.moveAsync({
          from: uri,
          to: destinationUri
        });
        
        Alert.alert(
          'Success', 
          `PDF saved as "${finalFileName}" in your documents folder.`,
          [{ text: 'OK' }]
        );
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to save PDF to local storage.');
    }
    setPdfLoading(false);
    setShowExportModal(false);
  };

  const handleExportPDF = () => {
    setShowExportModal(true);
  };

  if (loading) return <Text style={{ padding: 20 }}>Loading...</Text>;
  if (!data || !data.resume) return <Text style={{ padding: 20 }}>No data found.</Text>;

  // Transform data to match template format
  const templateData = {
    name: data.resume.name,
    email: data.resume.email,
    phone: data.resume.phone,
    address: data.resume.address,
    summary: data.resume.summary,
    experience: data.experience?.map((exp: any) => ({
      title: exp.job_title,
      company: exp.company,
      duration: `${exp.start_date} - ${exp.end_date}`,
      description: exp.description
    })) || [],
    education: data.education?.map((edu: any) => ({
      degree: edu.degree,
      school: edu.university,
      year: edu.year
    })) || [],
    skills: data.skills?.map((skill: any) => skill.skill) || []
  };

  // Template selection logic - use actual template components
  let RenderedTemplate = ResumeTemplate1; // Default to Template 1 (Professional)
  if (template === 'modern') RenderedTemplate = ResumeTemplate2; // Template 2 (Creative)
  if (template === 'minimal') RenderedTemplate = ResumeTemplate3; // Template 3 (Minimal)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button 
        mode="contained" 
        onPress={handleExportPDF} 
        loading={pdfLoading} 
        style={{ marginTop: 24, marginBottom: 16 }}
      >
        Export as PDF
      </Button>
      <RenderedTemplate userData={templateData} />

      {/* Export Options Modal */}
      <Modal
        visible={showExportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Export PDF</Text>
            
            <Text style={[styles.modalLabel, { color: colors.text }]}>File Name:</Text>
            <TextInput
              value={fileName}
              onChangeText={setFileName}
              style={[styles.fileNameInput, { 
                backgroundColor: colors.background, 
                borderColor: colors.border,
                color: colors.text 
              }]}
              placeholder="Enter file name"
              placeholderTextColor={colors.textSecondary}
            />
            
            <View style={styles.exportOptions}>
              <TouchableOpacity
                style={[
                  styles.exportOption,
                  exportType === 'share' && { backgroundColor: colors.primaryMuted }
                ]}
                onPress={() => setExportType('share')}
              >
                <Text style={[styles.exportOptionText, { color: colors.text }]}>Share PDF</Text>
                <Text style={[styles.exportOptionDesc, { color: colors.textSecondary }]}>
                  Share via email, messaging, or other apps
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.exportOption,
                  exportType === 'save' && { backgroundColor: colors.primaryMuted }
                ]}
                onPress={() => setExportType('save')}
              >
                <Text style={[styles.exportOptionText, { color: colors.text }]}>Save to Device</Text>
                <Text style={[styles.exportOptionDesc, { color: colors.textSecondary }]}>
                  Save PDF to your device's documents folder
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalButtons}>
              <Button 
                mode="outlined" 
                onPress={() => setShowExportModal(false)}
                style={[styles.modalButton, { borderColor: colors.tint }]}
                theme={{ colors: { primary: colors.tint } }}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={exportType === 'share' ? handleSharePDF : handleSavePDF}
                loading={pdfLoading}
                style={[styles.modalButton, { backgroundColor: colors.tint }]}
                theme={{ colors: { primary: colors.tint } }}
              >
                {exportType === 'share' ? 'Share' : 'Save'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

function escapeHtml(value: string) {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateResumeHTML(data: any, template: string = 'classic') {
  // Template-specific HTML generation
  const selectedTemplate = template || 'classic';
  
  if (selectedTemplate === 'modern') {
    return generateModernHTML(data);
  } else if (selectedTemplate === 'minimal') {
    return generateMinimalHTML(data);
  } else {
    return generateClassicHTML(data);
  }
}

function generateClassicHTML(data: any) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background-color: #fff; }
          .header { border-bottom: 2px solid #2196F3; padding-bottom: 15px; margin-bottom: 20px; }
          .name { font-size: 28px; font-weight: bold; color: #2196F3; margin-bottom: 5px; }
          .contact { font-size: 14px; color: #666; margin-bottom: 3px; }
          .address { font-size: 14px; color: #666; }
          .section { margin-bottom: 20px; }
          .sectionTitle { font-size: 16px; font-weight: bold; color: #2196F3; margin-bottom: 10px; text-transform: uppercase; }
          .summary { font-size: 14px; line-height: 20px; color: #333; }
          .experienceItem { margin-bottom: 15px; }
          .experienceHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
          .jobTitle { font-size: 16px; font-weight: bold; color: #333; }
          .duration { font-size: 14px; color: #666; }
          .company { font-size: 14px; font-weight: 600; color: #666; margin-bottom: 5px; }
          .description { font-size: 14px; line-height: 18px; color: #333; }
          .educationItem { margin-bottom: 10px; }
          .degree { font-size: 16px; font-weight: bold; color: #333; }
          .school { font-size: 14px; color: #666; }
          .skills { font-size: 14px; line-height: 18px; color: #333; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${escapeHtml(data.resume.name?.toUpperCase() || '')}</div>
          <div class="contact">${escapeHtml(data.resume.email || '')} | ${escapeHtml(data.resume.phone || '')}</div>
          <div class="address">${escapeHtml(data.resume.address || '')}</div>
        </div>
        
        <div class="section">
          <div class="sectionTitle">Professional Summary</div>
          <div class="summary">${data.resume.summary || ''}</div>
        </div>
        
        <div class="section">
          <div class="sectionTitle">Professional Experience</div>
          ${(data.experience || []).map((exp: any) => `
            <div class="experienceItem">
              <div class="experienceHeader">
                <span class="jobTitle">${escapeHtml(exp.job_title)}</span>
                <span class="duration">${escapeHtml(exp.start_date)} - ${escapeHtml(exp.end_date)}</span>
              </div>
              <div class="company">${escapeHtml(exp.company)}</div>
              <div class="description">${escapeHtml(exp.description)}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="sectionTitle">Education</div>
          ${(data.education || []).map((edu: any) => `
            <div class="educationItem">
              <div class="degree">${escapeHtml(edu.degree)}</div>
              <div class="school">${escapeHtml(edu.university)} • ${escapeHtml(edu.year)}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="sectionTitle">Technical Skills</div>
          <div class="skills">${(data.skills || []).map((s: any) => escapeHtml(s.skill)).join(', ')}</div>
        </div>
      </body>
    </html>
  `;
}

function generateModernHTML(data: any) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; }
          .header { background-color: #FF5722; color: white; padding: 25px; text-align: center; }
          .name { font-size: 32px; font-weight: bold; margin-bottom: 5px; }
          .title { font-size: 18px; opacity: 0.9; margin-bottom: 15px; }
          .contact { font-size: 14px; opacity: 0.8; margin-bottom: 3px; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; }
          .sectionTitle { font-size: 18px; font-weight: bold; color: #FF5722; margin-bottom: 12px; border-left: 4px solid #FF5722; padding-left: 10px; }
          .summary { font-size: 14px; line-height: 22px; color: #333; }
          .experienceItem { margin-bottom: 20px; padding-left: 10px; }
          .experienceHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
          .jobTitle { font-size: 16px; font-weight: bold; color: #333; }
          .duration { font-size: 14px; color: #666; font-style: italic; }
          .company { font-size: 14px; font-weight: 600; color: #FF5722; margin-bottom: 8px; }
          .description { font-size: 14px; line-height: 20px; color: #555; }
          .educationItem { margin-bottom: 15px; padding-left: 10px; }
          .degree { font-size: 16px; font-weight: bold; color: #333; }
          .school { font-size: 14px; color: #666; margin-top: 2px; }
          .skillsContainer { display: flex; flex-wrap: wrap; gap: 8px; }
          .skillTag { background-color: #FF5722; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${escapeHtml(data.resume.name || '')}</div>
          <div class="title">Creative Designer & Developer</div>
          <div class="contact">${escapeHtml(data.resume.email || '')}</div>
          <div class="contact">${escapeHtml(data.resume.phone || '')}</div>
          <div class="contact">${escapeHtml(data.resume.address || '')}</div>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="sectionTitle">About Me</div>
            <div class="summary">${data.resume.summary || ''}</div>
          </div>
          
          <div class="section">
            <div class="sectionTitle">Work Experience</div>
            ${(data.experience || []).map((exp: any) => `
              <div class="experienceItem">
                <div class="experienceHeader">
                  <span class="jobTitle">${escapeHtml(exp.job_title)}</span>
                  <span class="duration">${escapeHtml(exp.start_date)} - ${escapeHtml(exp.end_date)}</span>
                </div>
                <div class="company">${escapeHtml(exp.company)}</div>
                <div class="description">${escapeHtml(exp.description)}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <div class="sectionTitle">Education</div>
            ${(data.education || []).map((edu: any) => `
              <div class="educationItem">
                <div class="degree">${escapeHtml(edu.degree)}</div>
                <div class="school">${escapeHtml(edu.university)} • ${escapeHtml(edu.year)}</div>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <div class="sectionTitle">Skills & Expertise</div>
            <div class="skillsContainer">
              ${(data.skills || []).map((s: any) => `<span class="skillTag">${escapeHtml(s.skill)}</span>`).join('')}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateMinimalHTML(data: any) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 30px; background-color: #fff; }
          .header { margin-bottom: 40px; text-align: center; }
          .name { font-size: 36px; font-weight: 300; color: #333; margin-bottom: 8px; letter-spacing: 2px; }
          .title { font-size: 18px; color: #666; margin-bottom: 20px; font-weight: 400; }
          .contact { font-size: 14px; color: #888; font-weight: 300; margin-bottom: 4px; }
          .section { margin-bottom: 35px; }
          .sectionTitle { font-size: 20px; font-weight: 400; color: #333; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; }
          .summary { font-size: 15px; line-height: 24px; color: #555; font-weight: 300; }
          .experienceItem { margin-bottom: 25px; }
          .experienceHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
          .jobTitle { font-size: 17px; font-weight: 500; color: #333; }
          .duration { font-size: 14px; color: #888; font-weight: 300; }
          .company { font-size: 15px; color: #666; margin-bottom: 8px; font-weight: 400; }
          .description { font-size: 14px; line-height: 22px; color: #555; font-weight: 300; }
          .educationItem { margin-bottom: 20px; }
          .degree { font-size: 16px; font-weight: 500; color: #333; margin-bottom: 4px; }
          .school { font-size: 14px; color: #666; font-weight: 300; }
          .skillsContainer { display: flex; flex-wrap: wrap; gap: 10px; }
          .skillTag { background-color: #f5f5f5; color: #555; padding: 8px 16px; border-radius: 25px; border: 1px solid #e0e0e0; font-size: 13px; font-weight: 400; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="name">${escapeHtml(data.resume.name || '')}</div>
          <div class="title">Software Engineer</div>
          <div class="contact">${escapeHtml(data.resume.email || '')}</div>
          <div class="contact">${escapeHtml(data.resume.phone || '')}</div>
          <div class="contact">${escapeHtml(data.resume.address || '')}</div>
        </div>
        
        <div class="section">
          <div class="sectionTitle">Summary</div>
          <div class="summary">${data.resume.summary || ''}</div>
        </div>
        
        <div class="section">
          <div class="sectionTitle">Experience</div>
          ${(data.experience || []).map((exp: any) => `
            <div class="experienceItem">
              <div class="experienceHeader">
                <span class="jobTitle">${escapeHtml(exp.job_title)}</span>
                <span class="duration">${escapeHtml(exp.start_date)} - ${escapeHtml(exp.end_date)}</span>
              </div>
              <div class="company">${escapeHtml(exp.company)}</div>
              <div class="description">${escapeHtml(exp.description)}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="sectionTitle">Education</div>
          ${(data.education || []).map((edu: any) => `
            <div class="educationItem">
              <div class="degree">${escapeHtml(edu.degree)}</div>
              <div class="school">${escapeHtml(edu.university)} • ${escapeHtml(edu.year)}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="sectionTitle">Skills</div>
          <div class="skillsContainer">
            ${(data.skills || []).map((s: any) => `<span class="skillTag">${escapeHtml(s.skill)}</span>`).join('')}
          </div>
        </div>
      </body>
    </html>
  `;
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  fileNameInput: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
  exportOptions: {
    width: '100%',
    marginBottom: 15,
  },
  exportOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  exportOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exportOptionDesc: {
    fontSize: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  modalButton: {
    width: '45%',
  },
}); 