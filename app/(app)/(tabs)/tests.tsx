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
        <Link href={'/tests/test-form-2'}>to test form</Link>
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
