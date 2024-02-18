import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput as TextInputPaper } from 'react-native-paper'
type Props = {}

const index = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, gap: 4 }}>
        <Link href={'/(tabs)/tests/test-form'}>to test form</Link>
        <Link href={'/(tabs)/tests/example2'}>to exam</Link>
        <Link href={'/(tabs)/tests/ExampleUnistyles'}>to unistyles</Link>
        <Link href={'/(tabs)/tests/hook-form-example'}>to react hook form</Link>
        {/* <Link href={'/(tabs)/tests/test-form-activity'}>to react hook a</Link> */}
        <TextInputPaper
          style={styles.inputContainerStyle}
          mode="outlined"
          dense
          placeholder="Dense outlined input without label"
          // label="Password"
          // secureTextEntry
          left={<TextInputPaper.Icon icon="eye" />}
        />
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  inputContainerStyle: {
    margin: 8,
  },
})
