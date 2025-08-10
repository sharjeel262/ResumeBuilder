import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import ResumeTemplate1 from './ResumeTemplate1';
import ResumeTemplate2 from './ResumeTemplate2';
import ResumeTemplate3 from './ResumeTemplate3';

const { width } = Dimensions.get('window');

interface TemplatePreviewProps {
  templateId: number;
  scale?: number;
}

const TemplatePreview = ({ templateId, scale = 0.3 }: TemplatePreviewProps) => {
  const sampleData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    summary: 'Experienced professional with expertise in modern technologies.',
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Corp',
        duration: '2020 - Present',
        description: 'Led development of scalable applications.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science',
        school: 'University of Technology',
        year: '2018'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python']
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <ResumeTemplate1 userData={sampleData} />;
      case 2:
        return <ResumeTemplate2 userData={sampleData} />;
      case 3:
        return <ResumeTemplate3 userData={sampleData} />;
      default:
        return <ResumeTemplate1 userData={sampleData} />;
    }
  };

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      {renderTemplate()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
});

export default TemplatePreview; 