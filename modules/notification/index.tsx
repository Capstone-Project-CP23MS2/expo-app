import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import React, { useState, useEffect, useCallback } from 'react'
import { Ionicons } from '@expo/vector-icons' // Import the Ionicons icon set
import { SIZES } from '@/constants'

type Props = {}

// Replace this with your actual function to fetch notifications from the database
const fetchNotificationsFromDatabase = async () => {
  // Simulating fetching notifications from a database
  return [
    { id: 1, title: 'New message from John', timestamp: '2023-03-21T10:30:00Z' },
    { id: 2, title: 'Upcoming event reminder', timestamp: '2023-03-20T16:00:00Z' },
    { id: 3, title: 'Your order has been shipped', timestamp: '2023-03-19T08:15:00Z' },
    { id: 4, title: 'Your order has been test', timestamp: '2023-03-19T08:15:00Z' },
  ]
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchNotificationsFromDatabase()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await fetchNotificationsFromDatabase()
      setNotifications(fetchedNotifications)
    }

    fetchNotifications()
  }, [])

  const deleteNotification = id => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationTimestamp}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteNotification(item.id)}>
        <Ionicons name="close-circle" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{ padding: 15 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationContainer: {
    flex: 1,
    marginBottom: 15,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationTimestamp: {
    fontSize: 14,
    color: '#666',
  },
})

export default NotificationScreen
