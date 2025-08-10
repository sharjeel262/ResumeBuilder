import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const ResumePreviewScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resume Preview</Text>
      {/* TODO: Render selected template with user data */}
      <Button mode="contained" onPress={() => {}}>Export as PDF</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default ResumePreviewScreen; 