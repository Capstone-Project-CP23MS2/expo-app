import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
type Props = {};

const TestForm = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={10}>
        <ScrollView>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <Text>Test</Text>
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
          <TextInput placeholder="test" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TestForm;

const styles = StyleSheet.create({});
