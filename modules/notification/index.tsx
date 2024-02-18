import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';

type Props = {};

const Page = (props: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
      {/* TODO */}
      <Text>Noti Page</Text>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        placeholder="Select a language">
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Link href={'/(tabs)/tests/test-form'}>to test form</Link>
      <Link href={'/tests/test-form-2'}>to test form 2</Link>
      <Link href={'/demo'}>to Demo</Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
