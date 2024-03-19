import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Link } from 'expo-router'
import { UseGetUserByEmail, UseGetUsers } from '@/hooks/useAPI'
import useAsyncStorage from '@/hooks/useAsyncStorage'
import AppButton from '../shared/AppButton'
import { useAsyncStorage3 } from '@/hooks/useAsyncStorage3'
import { set } from 'zod'

type Props = {}

const Page = (props: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState()
  // const { value, getStorageItem, setStorageItem } = useAsyncStorage('@myData', 'defaultValue')
  const { data, setNewData } = useAsyncStorage3({ key: '@myData', initialValue: 'defaultValue' })

  console.log(data)

  // setStore('test2')
  // const { data: usersData, isLoading: isLoadingUsers } = UseGetUsers()
  // const { content: users } = usersData || {}
  // console.log(users)

  return (
    <View>
      {/* TODO */}
      <Text>Noti Page</Text>
      <Text>{data}</Text>
      {/* <Text>{storeValue}</Text> */}
      <AppButton
        label="setStorageItem"
        variant="primary"
        onPress={() => console.log(setNewData('changed'))}
      />
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        placeholder="Select a language"
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Link href={'/(tabs)/tests/test-form'}>to test form</Link>
      <Link href={'/tests/test-form-2'}>to test form 2</Link>
      <Link href={'/demo'}>to Demo</Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})
