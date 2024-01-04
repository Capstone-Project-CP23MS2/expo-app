// PartyList.tsx
import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Party } from './Party';

interface PartyListProps {
  parties: Party[];
  onDeleteParty: (id: string) => void;
  onViewPartyDetails: (id: string) => void;
}

const PartyList: React.FC<PartyListProps> = ({
  parties,
  onDeleteParty,
  onViewPartyDetails,
}) => {
  return (
    <FlatList
      data={parties}
      keyExtractor={party => party.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.party}
          onPress={() => onViewPartyDetails(item.id)}
          onLongPress={() => onDeleteParty(item.id)}>
          <Text style={styles.partyName}>{item.name}</Text>
          <Text>{item.location}</Text>
          <Text>{item.date}</Text>
          <Text>{item.description}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  party: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  partyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PartyList;
