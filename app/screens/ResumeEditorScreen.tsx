import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const ResumeEditorScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Resume</Text>
      {/* TODO: Add form fields for resume sections */}
      <Button mode="contained" onPress={() => {}}>Save</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default ResumeEditorScreen; 