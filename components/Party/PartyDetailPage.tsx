// PartyDetailPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Party } from './Party';

interface PartyDetailPageProps {
  party: Party;
}

const PartyDetailPage: React.FC<PartyDetailPageProps> = ({ party }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{party.name}</Text>
      <Text>{party.location}</Text>
      <Text>{party.date}</Text>
      <Text>{party.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default PartyDetailPage;
