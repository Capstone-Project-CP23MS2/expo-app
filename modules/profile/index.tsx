import { useAuth } from '@/context/authContext'
import { UseDeleteUser } from '@/hooks/useAPI'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-ui-lib'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { SIZES } from '@/constants'

type Props = {}

const Page = (props: Props) => {
  const { user, onLogout } = useAuth()
  const router = useRouter()
  const deleteMutation = UseDeleteUser()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="account-circle" size={100} color={'black'} />
          <Text style={{ fontWeight: 'bold', fontSize: SIZES.large }}>{user?.username}</Text>
          <Text md>{user?.email}</Text>
        </View>
        <Button label="Sign Out" onPress={onLogout} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    gap: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    width: '100%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 15,
  },
})

export default Page
