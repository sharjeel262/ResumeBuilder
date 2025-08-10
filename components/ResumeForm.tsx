import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const ResumeForm = () => {
  return (
    <View>
      <Text>Resume Form (Personal Info, Education, etc.)</Text>
      {/* TODO: Add form fields */}
      <TextInput label="Full Name" />
    </View>
  );
};

export default ResumeForm; 