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

const ResumeTemplate1 = ({ userData }: { userData?: UserData }) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.name}>{userData?.name || 'John Doe'}</Text>
      <Text style={styles.contact}>
        {userData?.email || 'john.doe@email.com'} | {userData?.phone || '+1 (555) 123-4567'}
      </Text>
      <Text style={styles.address}>{userData?.address || 'New York, NY'}</Text>
    </View>

    {/* Summary */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
      <Text style={styles.summary}>
        {userData?.summary || 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.'}
      </Text>
    </View>

    {/* Experience */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
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
            <Text style={styles.jobTitle}>Senior Software Engineer</Text>
            <Text style={styles.duration}>2020 - Present</Text>
          </View>
          <Text style={styles.company}>Tech Solutions Inc.</Text>
          <Text style={styles.description}>
            Led development of scalable web applications using React and Node.js. Managed team of 5 developers and delivered 3 major projects on time and within budget.
          </Text>
        </View>
      )}
    </View>

    {/* Education */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>EDUCATION</Text>
      {userData?.education?.map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <Text style={styles.degree}>{edu.degree}</Text>
          <Text style={styles.school}>{edu.school} • {edu.year}</Text>
        </View>
      )) || (
        <View style={styles.educationItem}>
          <Text style={styles.degree}>Bachelor of Science in Computer Science</Text>
          <Text style={styles.school}>University of Technology • 2018</Text>
        </View>
      )}
    </View>

    {/* Skills */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
      <Text style={styles.skills}>
        {userData?.skills?.join(', ') || 'JavaScript, React, Node.js, Python, AWS, Docker, Git, Agile Methodologies'}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: 800,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  contact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  experienceItem: {
    marginBottom: 15,
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
  },
  company: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  school: {
    fontSize: 14,
    color: '#666',
  },
  skills: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
  },
});

export default ResumeTemplate1; 