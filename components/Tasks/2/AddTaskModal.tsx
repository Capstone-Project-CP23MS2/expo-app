import React, { useState } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const AddTaskModal = () => {
  const [task, setTask] = useState('');

  const handleSubmit = () => {
    if (task.length === 0) {
      return;
    }

    setTasks([...tasks, { task }]);
    closeModal();
  };

  const closeModal = () => {
    setTask('');
    props.onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เพิ่มงาน</Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="งาน"
        style={styles.input}
      />
      <Button
        title="เพิ่ม"
        onPress={handleSubmit}
        color="#000"
        backgroundColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: 200,
    height: 40,
  },
});

export default AddTaskModal;
