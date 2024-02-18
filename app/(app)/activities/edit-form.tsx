import { StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { View, TextField, Text, Button, Card } from 'react-native-ui-lib';
import RNUIThemeInit from '@/constants/designSystem';
type Props = {};

const index = (props: Props) => {
  return (
    <View flex padding-page>
      <Text heading marginB-s4>
        My Screen
      </Text>
      <Card height={100} center padding-card marginB-s4>
        <Text body>This is an example card </Text>
      </Card>

      <Button label="Button" body bg-primaryColor square></Button>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
