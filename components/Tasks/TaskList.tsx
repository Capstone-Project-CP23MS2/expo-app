// TaskList.tsx
import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { Task } from './Task';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={task => task.id}
      renderItem={({ item }) => (
        <View style={styles.task}>
          <Text>{item.text}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskList;
