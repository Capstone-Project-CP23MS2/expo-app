// App.tsx
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { Party } from './Party';
import PartyList from './PartyList';
import AddPartyForm from './AddPartyForm';
import PartyDetailPage from './PartyDetailPage';
import { NavigationContainer } from '@react-navigation/native';
// import { Stack } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [isAddPartyFormVisible, setAddPartyFormVisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const handleAddParty = (party: Omit<Party, 'id'>) => {
    const newParty: Party = {
      id: Math.random().toString(),
      ...party,
    };
    setParties(prevParties => [...prevParties, newParty]);
    toggleAddPartyForm();
  };

  const toggleAddPartyForm = () => {
    setAddPartyFormVisible(!isAddPartyFormVisible);
  };

  const handleDeleteParty = (id: string) => {
    setParties(prevParties => prevParties.filter(party => party.id !== id));
  };

  const handleViewPartyDetails = (id: string) => {
    const party = parties.find(p => p.id === id);
    if (party) {
      setSelectedParty(party);
    }
  };

  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ title: 'Party Finder' }}
        component={() => (
          <SafeAreaView style={styles.container}>
            <PartyList
              parties={parties}
              onDeleteParty={handleDeleteParty}
              onViewPartyDetails={handleViewPartyDetails}
            />
            <Button title="Add Party" onPress={toggleAddPartyForm} />
            {isAddPartyFormVisible && (
              <AddPartyForm onAddParty={handleAddParty} />
            )}
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="PartyDetail"
        options={{ title: 'Party Details' }}
        component={() => <PartyDetailPage party={selectedParty!} />}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
