import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Task = ({ task, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    onDelete(task);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.task}>{task}</Text>
      <Button
        title={isCompleted ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}
        onPress={handleComplete}
        color="#000"
        backgroundColor="#fff"
      />
      <Button
        title="ลบ"
        onPress={handleDelete}
        color="#000"
        backgroundColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  task: {
    fontSize: 18,
  },
});
