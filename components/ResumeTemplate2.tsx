import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  summary?: string;
  experience?: {
    title: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education?: {
    degree: string;
    school: string;
    year: string;
  }[];
  skills?: string[];
}

const ResumeTemplate2 = ({ userData }: { userData?: UserData }) => (
  <View style={styles.container}>
    {/* Header with colored background */}
    <View style={styles.header}>
      <Text style={styles.name}>{userData?.name || 'Sarah Johnson'}</Text>
      <Text style={styles.title}>Creative Designer & Developer</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.contact}>{userData?.email || 'sarah.johnson@email.com'}</Text>
        <Text style={styles.contact}>{userData?.phone || '+1 (555) 987-6543'}</Text>
        <Text style={styles.contact}>{userData?.address || 'San Francisco, CA'}</Text>
      </View>
    </View>

    {/* Summary */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About Me</Text>
      <Text style={styles.summary}>
        {userData?.summary || 'Passionate creative professional with expertise in UI/UX design and front-end development. Combining artistic vision with technical skills to create engaging digital experiences that drive user engagement and business growth.'}
      </Text>
    </View>

    {/* Experience */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {userData?.experience?.map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.jobTitle}>{exp.title}</Text>
            <Text style={styles.duration}>{exp.duration}</Text>
          </View>
          <Text style={styles.company}>{exp.company}</Text>
          <Text style={styles.description}>{exp.description}</Text>
        </View>
      )) || (
        <>
          <View style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.jobTitle}>Senior UI/UX Designer</Text>
              <Text style={styles.duration}>2021 - Present</Text>
            </View>
            <Text style={styles.company}>Creative Studio Pro</Text>
            <Text style={styles.description}>
              Lead designer for mobile and web applications, creating intuitive user interfaces that improve user engagement by 40%. Collaborated with development teams to ensure seamless implementation.
            </Text>
          </View>
          <View style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.jobTitle}>Frontend Developer</Text>
              <Text style={styles.duration}>2019 - 2021</Text>
            </View>
            <Text style={styles.company}>Digital Innovations Co.</Text>
            <Text style={styles.description}>
              Developed responsive web applications using React and modern CSS. Implemented design systems and maintained code quality across multiple projects.
            </Text>
          </View>
        </>
      )}
    </View>

    {/* Education */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Education</Text>
      {userData?.education?.map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <Text style={styles.degree}>{edu.degree}</Text>
          <Text style={styles.school}>{edu.school} • {edu.year}</Text>
        </View>
      )) || (
        <View style={styles.educationItem}>
          <Text style={styles.degree}>Bachelor of Arts in Graphic Design</Text>
          <Text style={styles.school}>Design Institute • 2019</Text>
        </View>
      )}
    </View>

    {/* Skills */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Skills & Expertise</Text>
      <View style={styles.skillsContainer}>
        {userData?.skills?.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        )) || (
          <>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>UI/UX Design</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>React</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Figma</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>JavaScript</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>CSS3</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Adobe Creative Suite</Text>
            </View>
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    minHeight: 800,
  },
  header: {
    backgroundColor: '#FF5722',
    padding: 25,
    margin: -20,
    marginBottom: 30,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 15,
  },
  contactInfo: {
    gap: 3,
  },
  contact: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
    paddingLeft: 10,
  },
  summary: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  experienceItem: {
    marginBottom: 20,
    paddingLeft: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  duration: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  company: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5722',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  educationItem: {
    marginBottom: 15,
    paddingLeft: 10,
  },
  degree: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  school: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  skillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ResumeTemplate2; 