import { useAuth } from '@/context/authContext'
import { UseDeleteUser } from '@/hooks/useAPI'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-ui-lib'
type Props = {}

const Page = (props: Props) => {
  const { currentUser, onLogout } = useAuth()
  const router = useRouter()
  const deleteMutation = UseDeleteUser()
  const onTestDetele = async () => {
    deleteMutation.mutate(6, {
      onSuccess() {
        console.log('🚮 Delete Test User Success')
        router.push('/(auth)/login')
      },
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text md>userId: {currentUser?.userId}</Text>
      <Text md>username: {currentUser?.username}</Text>
      <Text md>email: {currentUser?.email}</Text>
      <Text md>dob: {currentUser?.dateOfBirth}</Text>

      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Tasks</Text>
        <Button title="Add Task" onPress={() => setModalVisible(true)} />
      </View>
      <TaskList tasks={tasks} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <AddTaskForm onAddTask={handleAddTask} />
        </View>
      </Modal> */}
      <Button label="Sign Out" onPress={onLogout} />
      <Button label="Delete" onPress={onTestDetele} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})

export default Page
