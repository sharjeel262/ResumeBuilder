import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

const TemplatePickerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Template</Text>
      {/* TODO: List template cards here */}
      <Card style={styles.card}>
        <Card.Title title="Basic Template" />
        <Card.Content>
          <Text>Preview of Basic Template</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { marginBottom: 16 },
});

export default TemplatePickerScreen; 