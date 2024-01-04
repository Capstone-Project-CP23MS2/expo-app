import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';

type Props = {};

const index = (props: Props) => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href={'/(tabs)/activities'} asChild>
        <Button title="Open App" />
      </Link>
    </View>
  );
};

export default index;
// export { default } from '@/components/home/page';
const styles = StyleSheet.create({});
