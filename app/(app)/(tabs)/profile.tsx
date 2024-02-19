import { useAuth } from '@/context/auth'
import React, { useState } from 'react'
import { SafeAreaView, Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-ui-lib'
type Props = {}

const Page = (props: Props) => {
  const { user, signIn, signOut } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <Text>{user.idToken}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
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
      <Button label="Sign In (for test)" onPress={signIn} />
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
