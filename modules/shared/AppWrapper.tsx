import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode, Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  children: ReactNode;
  useKeyboardAvoidingView?: boolean;
};

const AppWrapper = ({ children, useKeyboardAvoidingView }: Props) => {
  if (useKeyboardAvoidingView) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView>{children}</SafeAreaView>;
};

export default AppWrapper;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#7CFC00',
  },
  scrollView: {
    backgroundColor: '#20B2AA',
  },
});
