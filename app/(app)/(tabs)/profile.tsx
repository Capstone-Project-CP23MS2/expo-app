import { useAuth } from '@/context/auth'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-ui-lib'
type Props = {}

const Page = (props: Props) => {
  const { user, signIn, signOut, email } = useAuth()
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <Text md>userId: {user?.userId!}</Text>
      <Text md>username: {user?.userName!}</Text>
      <Text md>email: {user?.email!}</Text>

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
      <Button label="Sign Out" onPress={signOut} />
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
