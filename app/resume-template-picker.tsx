import Header from '@/components/Header';
import TemplatePreview from '@/components/TemplatePreview';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const templates = [
  { 
    id: 1, 
    name: 'Professional', 
    description: 'Clean and modern design perfect for corporate roles',
    color: '#2196F3',
    icon: 'briefcase-outline' as const
  },
  { 
    id: 2, 
    name: 'Creative', 
    description: 'Stand out with this bold and colorful template',
    color: '#FF5722',
    icon: 'color-palette-outline' as const
  },
  { 
    id: 3, 
    name: 'Minimal', 
    description: 'Simple and elegant design with lots of whitespace',
    color: '#607D8B',
    icon: 'remove-outline' as const
  },
];

export default function ResumeTemplatePicker() {
  const router = useRouter();
  const { resume_id } = useLocalSearchParams();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  const handleSelect = async (templateId: number) => {
    if (!resume_id) {
      // If no resume_id, go to resume editor first
      router.push('/resume-editor');
      return;
    }
    
    const templateName = templateId === 1 ? 'classic' : templateId === 2 ? 'modern' : 'minimal';
    
    console.log('Selected template:', templateId, '->', templateName);
    console.log('Resume ID:', resume_id);
    
    // Navigate directly to preview with selected template
    router.push({ 
      pathname: '/resume-preview', 
      params: { 
        resume_id: String(resume_id), 
        template: templateName
      } 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header 
        title="Choose Template"
        onMenuPress={() => router.back()}
        showBackButton={true}
        onBackPress={() => router.back()}
        isDarkMode={isDarkMode}
      />
      
      <ScrollView style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Select Your Resume Template</Text>
        <Text style={[styles.subtitle, { color: colors.icon }]}>
          Choose from our professionally designed templates
        </Text>
        
        <View style={styles.templatesGrid}>
          {templates.map((template) => (
            <TouchableOpacity 
              key={template.id} 
              style={[styles.templateCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}
              onPress={() => handleSelect(template.id)}
            >
              {/* Template Preview */}
              <View style={styles.previewContainer}>
                <TemplatePreview templateId={template.id} scale={0.6} />
              </View>
              
              {/* Template Info */}
              <View style={styles.templateInfo}>
                <View style={styles.templateHeader}>
                  <View style={[styles.templateIcon, { backgroundColor: template.color + '20' }]}>
                    <Ionicons name={template.icon} size={24} color={template.color} />
                  </View>
                  <View style={styles.templateText}>
                    <Text style={[styles.templateName, { color: colors.text }]}>{template.name}</Text>
                    <Text style={[styles.templateDesc, { color: colors.icon }]}>{template.description}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={[styles.selectButton, { backgroundColor: template.color }]}
                  onPress={() => handleSelect(template.id)}
                >
                  <Text style={styles.selectButtonText}>Use This Template</Text>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Additional Info */}
        <View style={[styles.infoCard, { backgroundColor: colors.background, borderColor: colors.icon + '20' }]}>
          <Ionicons name="information-circle-outline" size={24} color={colors.tint} />
          <Text style={[styles.infoText, { color: colors.text }]}>
            All templates are fully customizable. You can edit colors, fonts, and layout after selection.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  templatesGrid: {
    gap: 20,
    marginBottom: 30,
  },
  templateCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    minHeight: 300,
  },
  templateInfo: {
    padding: 20,
  },
  templateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  templateIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  templateText: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  templateDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    gap: 15,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
}); 