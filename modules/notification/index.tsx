import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import React, { useState, useCallback } from 'react'
import { UseDeleteNotification, UseGetMyUserInfo, UseGetNotifications } from '@/hooks/useAPI'
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

import { COLORS, SIZES } from '@/constants'

const NotificationScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const { data, isLoading, isError, error, refetch } = UseGetNotifications()
  const { data: userInfoData } = UseGetMyUserInfo()
  const { content: notifications } = data || {}

  // Delete Notification
  const deleteMutation = UseDeleteNotification()
  const delNotification = (notiId: number) => {
    deleteMutation.mutate(notiId, {
      onSuccess() {},
    })
  }

  // Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  const renderNotification = ({ item }: any) => (
    <View style={styles.notificationContainer}>
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: item.type == 'join' ? COLORS.primary : COLORS.gray,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
      >
        {item.type == 'join' ? (
          <FontAwesome5 name="walking" size={30} color="white" />
        ) : (
          <MaterialCommunityIcons name="account-remove" size={30} color="white" />
        )}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.message}</Text>
        <Text style={styles.notificationTimestamp}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => delNotification(item.notificationId)}>
        <Ionicons name="close-circle" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error: {error.message}</Text>
        ) : notifications?.filter(notification => notification.targetId === userInfoData?.userId)
            .length ? (
          <FlatList
            data={notifications?.filter(
              notification => notification.targetId === userInfoData?.userId,
            )}
            renderItem={renderNotification}
            keyExtractor={item => item.notificationId.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ padding: 15 }}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              width: '100%',
              gap: 5,
            }}
          >
            <Text style={{ fontSize: SIZES.large, fontWeight: 'bold' }}>No notifications.</Text>
            <Text>You can see a list of notifications here.</Text>
          </View>
        )}
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
