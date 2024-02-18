import React, { useState } from 'react'
import { SafeAreaView, Button, Modal, StyleSheet, Text, View } from 'react-native'
type Props = {}

const Page = (props: Props) => {
  // const [tasks, setTasks] = useState<Task[]>([])
  // const [isModalVisible, setModalVisible] = useState(false)

  // const handleAddTask = (text: string) => {
  //   const newTask: Task = {
  //     id: Math.random().toString(),
  //     text,
  //     completed: false,
  //   };
  //   setTasks(prevTasks => [...prevTasks, newTask]);
  //   setModalVisible(false);
  // };

  return (
    <SafeAreaView style={styles.container}>
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
