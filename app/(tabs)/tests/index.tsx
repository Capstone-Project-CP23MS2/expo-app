import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const index = (props: Props) => {
  return (
    <SafeAreaView>
      <Link href={'/(tabs)/tests/test-form'}>to test form</Link>

      <Link href={'/(tabs)/tests/ExampleUnistyles'}>to unistyles</Link>
      <Link href={'/(tabs)/tests/hook-form-example'}>to react hook form</Link>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
