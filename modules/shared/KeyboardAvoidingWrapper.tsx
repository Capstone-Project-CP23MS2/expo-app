import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useHeaderHeight } from '@react-navigation/elements';

type Props = {
  children: ReactNode;
};

const keyboardAvoidingWrapper = ({ children }: Props) => {
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      {children}
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default keyboardAvoidingWrapper;

const styles = StyleSheet.create({});
