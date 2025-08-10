import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Signup</Text>
      {/* TODO: Add email/password fields and auth logic */}
      <TextInput label="Email" style={styles.input} />
      <TextInput label="Password" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={() => {}}>Login</Button>
      <Button mode="text" onPress={() => {}}>Sign Up</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { marginBottom: 12 },
});

export default AuthScreen; 