import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

type Props = {};

const Page = (props: Props) => {
  return (
    <View>
      {/* TODO */}
      <Text>Profile Page</Text>
      <Link href={'/activities/2345'}>Test</Link>
      <Link href={'/demo'}>Test</Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
