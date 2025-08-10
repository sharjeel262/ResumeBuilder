import React from 'react';
import { Card } from 'react-native-paper';

const TemplateCard = ({ title, onPress }) => (
  <Card onPress={onPress} style={{ marginBottom: 16 }}>
    <Card.Title title={title} />
    <Card.Content>
      {/* TODO: Add template preview image or description */}
    </Card.Content>
  </Card>
);

export default TemplateCard; 