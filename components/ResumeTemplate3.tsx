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

const ResumeTemplate3 = ({ userData }: { userData?: UserData }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.name}>{userData?.name || 'Alex Chen'}</Text>
      <Text style={styles.title}>{userData?.title || 'Software Engineer'}</Text>
      <View style={styles.contactInfo}>
        <Text style={styles.contact}>{userData?.email || 'alex.chen@email.com'}</Text>
        <Text style={styles.contact}>{userData?.phone || '+1 (555) 456-7890'}</Text>
        <Text style={styles.contact}>{userData?.address || 'Seattle, WA'}</Text>
      </View>
    </View>

    {/* Summary */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Summary</Text>
      <Text style={styles.summary}>
        {userData?.summary || 'Dedicated software engineer with a passion for clean code and efficient solutions. Experienced in building scalable applications and collaborating with cross-functional teams to deliver high-quality products.'}
      </Text>
    </View>

    {/* Experience */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Experience</Text>
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
        <View style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.jobTitle}>Software Engineer</Text>
            <Text style={styles.duration}>2021 - Present</Text>
          </View>
          <Text style={styles.company}>Tech Innovations LLC</Text>
          <Text style={styles.description}>
            Develop and maintain web applications using modern technologies. Collaborate with design and product teams to implement user-friendly interfaces and optimize application performance.
          </Text>
        </View>
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
          <Text style={styles.degree}>Master of Science in Computer Science</Text>
          <Text style={styles.school}>University of Washington • 2021</Text>
        </View>
      )}
    </View>

    {/* Skills */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Skills</Text>
      <View style={styles.skillsContainer}>
        {userData?.skills?.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        )) || (
          <>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>JavaScript</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>React</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Node.js</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Python</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>AWS</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Docker</Text>
            </View>
          </>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    minHeight: 800,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  name: {
    fontSize: 36,
    fontWeight: '300',
    color: '#333',
    marginBottom: 8,
    letterSpacing: 2,
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    fontWeight: '400',
  },
  contactInfo: {
    alignItems: 'center',
    gap: 4,
  },
  contact: {
    fontSize: 14,
    color: '#888',
    fontWeight: '300',
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
    fontWeight: '300',
  },
  experienceItem: {
    marginBottom: 25,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
  },
  duration: {
    fontSize: 14,
    color: '#888',
    fontWeight: '300',
  },
  company: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    fontWeight: '300',
  },
  educationItem: {
    marginBottom: 20,
  },
  degree: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  school: {
    fontSize: 14,
    color: '#666',
    fontWeight: '300',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillTag: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skillText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '400',
  },
});

export default ResumeTemplate3;
