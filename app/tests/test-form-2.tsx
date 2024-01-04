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
        // style={{ flex: 1 }}
        behavior="height"
        keyboardVerticalOffset={80}>
        <ScrollView>
          <Text>Test 2</Text>
          <Text>Test 2</Text>
          <Text>Test 2</Text>
          <Text>Test 2</Text>
          <Text>Test 2</Text>
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
