import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { supabase } from '../services/supabaseClient';

const ResumeEditorScreen = () => {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    address: '',
    title: '',
    summary: '',
  });

  // Use manual dark mode if set, otherwise use system preference
  const colorScheme = isDarkMode ? 'dark' : systemColorScheme;
  const colors = Colors[colorScheme || 'light'];

  const handleChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    setLoading(true);
    setError('');
    // Save to Supabase (insert and get id)
    const { data, error } = await supabase
      .from('resumes')
      .insert([{ ...personalInfo }])
      .select('id')
      .single();
    setLoading(false);
    if (error || !data) {
      setError(error?.message || 'Failed to create resume');
    } else {
      // Navigate to Education page, passing resume_id
      router.push({ pathname: '/resume-education', params: { resume_id: data.id } });
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Personal Information</Text>
      <TextInput
        label="Full Name"
        value={personalInfo.name}
        onChangeText={(text) => handleChange('name', text)}
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
        label="Title (e.g. Software Engineer)"
        value={personalInfo.title}
        onChangeText={(text) => handleChange('title', text)}
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
        label="Summary"
        value={personalInfo.summary}
        onChangeText={(text) => handleChange('summary', text)}
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
      <TextInput
        label="Email"
        value={personalInfo.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
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
        label="Phone"
        value={personalInfo.phone}
        onChangeText={(text) => handleChange('phone', text)}
        style={styles.input}
        keyboardType="phone-pad"
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
        label="LinkedIn"
        value={personalInfo.linkedin}
        onChangeText={(text) => handleChange('linkedin', text)}
        style={styles.input}
        autoCapitalize="none"
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
        label="Address"
        value={personalInfo.address}
        onChangeText={(text) => handleChange('address', text)}
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
        Next: Education
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 16, paddingVertical: 8 },
});

export default ResumeEditorScreen; 