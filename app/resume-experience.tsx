import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { supabase } from '../services/supabaseClient';

const ResumeExperienceScreen = () => {
  const router = useRouter();
  const { resume_id } = useLocalSearchParams();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [experiences, setExperiences] = useState([
    { job_title: '', company: '', start_date: '', end_date: '', description: '' },
  ]);

  // Use manual dark mode if set, otherwise use system preference
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  const handleChange = (index: number, field: string, value: string) => {
    setExperiences((prev) => {
      const updated = [...prev];
      updated[index][field as keyof typeof updated[0]] = value;
      return updated;
    });
  };

  const handleAdd = () => {
    setExperiences((prev) => [...prev, { job_title: '', company: '', start_date: '', end_date: '', description: '' }]);
  };

  const handleRemove = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Save experience data
      const expRows = experiences.filter(e => e.job_title.trim()).map(e => ({ ...e, resume_id }));
      if (expRows.length > 0) {
        const { error: expError } = await supabase
          .from('experience')
          .insert(expRows);
        if (expError) throw expError;
      }

      // Navigate to template picker to select template
      router.push({ 
        pathname: '/resume-template-picker', 
        params: { resume_id: String(resume_id) } 
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save experience data');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Professional Experience</Text>
      {experiences.map((exp, idx) => (
        <View key={idx} style={[styles.expBlock, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            label="Job Title"
            value={exp.job_title}
            onChangeText={(text) => handleChange(idx, 'job_title', text)}
            style={styles.input}
            mode="outlined"
            theme={{
              colors: {
                primary: colors.tint,
                background: colors.surface,
                surface: colors.surface,
                text: colors.text,
                placeholder: colors.textSecondary,
              }
            }}
          />
          <TextInput
            label="Company"
            value={exp.company}
            onChangeText={(text) => handleChange(idx, 'company', text)}
            style={styles.input}
            mode="outlined"
            theme={{
              colors: {
                primary: colors.tint,
                background: colors.surface,
                surface: colors.surface,
                text: colors.text,
                placeholder: colors.textSecondary,
              }
            }}
          />
          <TextInput
            label="Start Date"
            value={exp.start_date}
            onChangeText={(text) => handleChange(idx, 'start_date', text)}
            style={styles.input}
            placeholder="e.g. Jan 2020"
            mode="outlined"
            theme={{
              colors: {
                primary: colors.tint,
                background: colors.surface,
                surface: colors.surface,
                text: colors.text,
                placeholder: colors.textSecondary,
              }
            }}
          />
          <TextInput
            label="End Date"
            value={exp.end_date}
            onChangeText={(text) => handleChange(idx, 'end_date', text)}
            style={styles.input}
            placeholder="e.g. Dec 2022 or Present"
            mode="outlined"
            theme={{
              colors: {
                primary: colors.tint,
                background: colors.surface,
                surface: colors.surface,
                text: colors.text,
                placeholder: colors.textSecondary,
              }
            }}
          />
          <TextInput
            label="Description"
            value={exp.description}
            onChangeText={(text) => handleChange(idx, 'description', text)}
            style={styles.input}
            multiline
            mode="outlined"
            theme={{
              colors: {
                primary: colors.tint,
                background: colors.surface,
                surface: colors.surface,
                text: colors.text,
                placeholder: colors.textSecondary,
              }
            }}
          />
          {experiences.length > 1 && (
            <IconButton 
              icon="delete" 
              onPress={() => handleRemove(idx)}
              iconColor={colors.icon}
              style={styles.deleteButton}
            />
          )}
        </View>
      ))}
      <Button 
        mode="outlined" 
        onPress={handleAdd} 
        style={[styles.button, { borderColor: colors.tint }]} 
        icon="plus"
        theme={{
          colors: {
            primary: colors.tint,
            outline: colors.tint,
          }
        }}
      >
        Add Another
      </Button>
      {error ? <HelperText type="error" theme={{ colors: { error: '#ef4444' } }}>{error}</HelperText> : null}
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={handleGoHome} 
          style={[styles.button, styles.homeButton, { borderColor: colors.tint }]} 
          icon="home"
          theme={{
            colors: {
              primary: colors.tint,
              outline: colors.tint,
            }
          }}
        >
          Go Home
        </Button>
        <Button 
          mode="contained" 
          onPress={handleFinish} 
          loading={loading} 
          style={[styles.button, styles.nextButton, { backgroundColor: colors.tint }]}
          theme={{
            colors: {
              primary: colors.tint,
            }
          }}
        >
          Next: Choose Template
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { marginBottom: 12 },
  button: { marginTop: 12, paddingVertical: 8 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  homeButton: {
    flex: 1,
    marginRight: 8,
  },
  nextButton: {
    flex: 2,
    marginLeft: 8,
  },
  expBlock: { marginBottom: 16, borderRadius: 12, padding: 16, borderWidth: 1 },
  deleteButton: { alignSelf: 'flex-end', marginTop: 8 },
});

export default ResumeExperienceScreen; 