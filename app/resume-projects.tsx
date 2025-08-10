import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { supabase } from '../services/supabaseClient';

const ResumeProjectsScreen = () => {
  const router = useRouter();
  const { resume_id } = useLocalSearchParams();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([
    { name: '', description: '' },
  ]);

  // Use manual dark mode if set, otherwise use system preference
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  const handleChange = (index: number, field: string, value: string) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index][field as keyof typeof updated[0]] = value;
      return updated;
    });
  };

  const handleAdd = () => {
    setProjects((prev) => [...prev, { name: '', description: '' }]);
  };

  const handleRemove = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    setLoading(true);
    setError('');
    const projectRows = projects.filter(p => p.name.trim()).map(p => ({ ...p, resume_id }));
    const { error } = await supabase
      .from('projects')
      .insert(projectRows);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push({ pathname: '/resume-other-skills', params: { resume_id } });
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Projects</Text>
      {projects.map((project, idx) => (
        <View key={idx} style={[styles.projectBlock, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput
            label="Project Name"
            value={project.name}
            onChangeText={(text) => handleChange(idx, 'name', text)}
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
            label="Description"
            value={project.description}
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
          {projects.length > 1 && (
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
      <Button 
        mode="contained" 
        onPress={handleNext} 
        loading={loading} 
        style={[styles.button, { backgroundColor: colors.tint }]}
        theme={{
          colors: {
            primary: colors.tint,
          }
        }}
      >
        Next: Other Skills
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { marginBottom: 12 },
  button: { marginTop: 12, paddingVertical: 8 },
  projectBlock: { marginBottom: 16, borderRadius: 12, padding: 16, borderWidth: 1 },
  deleteButton: { alignSelf: 'flex-end', marginTop: 8 },
});

export default ResumeProjectsScreen; 