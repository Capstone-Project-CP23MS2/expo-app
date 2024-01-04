// AddPartyForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Party } from './Party';

interface AddPartyFormProps {
  onAddParty: (party: Omit<Party, 'id'>) => void;
}

const AddPartyForm: React.FC<AddPartyFormProps> = ({ onAddParty }) => {
  const [partyName, setPartyName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddParty = () => {
    if (partyName && location && date && description) {
      const newParty: Omit<Party, 'id'> = {
        name: partyName,
        location,
        date,
        description,
      };
      onAddParty(newParty);
      setPartyName('');
      setLocation('');
      setDate('');
      setDescription('');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Party Name"
        value={partyName}
        onChangeText={setPartyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Party" onPress={handleAddParty} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  input: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default AddPartyForm;
