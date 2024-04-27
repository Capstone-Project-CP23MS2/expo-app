import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Button,
  Platform,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import React, { useState, useCallback } from 'react';
import {
  UseDeleteNotification,
  UseGetNotificationById,
  UseUpdateNotification,
} from '@/hooks/useAPI';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { COLORS, SIZES } from '@/constants';
import { useAuth } from '@/context/authContext';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { StatusBar } from 'expo-status-bar';

// notifications imports
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'; // Optional

// Initialize the notification service
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationScreen = () => {
  const { styles } = useStyles(stylesheet);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch } = UseGetNotificationById(user?.userId);
  const { content: notifications } = data || {};

  // Update Unread
  const updateMutation = UseUpdateNotification();
  const updateNotification = (notiId: number, unRead: boolean) => {
    updateMutation.mutate(
      { notiId, unRead },
      {
        onSuccess() {
          console.log(`Update unread notificationId: ${notiId} to ${unRead}`);
        },
        onError() {
          console.error('Failed to update');
        },
      },
    );
  };

  // Delete Notification
  const deleteMutation = UseDeleteNotification();
  const delNotification = (notiId: number) => {
    deleteMutation.mutate(notiId, {
      onSuccess() {},
    });
  };

  // Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const renderNotification = ({ item }: any) => (
    <Pressable
      style={[
        styles.notificationContainer,
        { backgroundColor: item.unRead ? '#FFF' : COLORS.mediumWhite },
      ]}
      onPress={() => updateNotification(item.notificationId, !item.unRead)}
    >
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
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error: {error.message}</Text>
        ) : notifications?.length ? (
          <FlatList
            data={notifications}
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
            <Text style={styles.emptyTitle}>ไม่มีแจ้งเตือน</Text>
            <Text style={styles.emptySub}>คุณจะเห็นลิสต์แจ้งเตือนบริเวณนี้</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationContainer: {
    flex: 1,
    marginBottom: 15,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  emptyTitle: {
    ...typography.lgB,
  },
  emptySub: {
    ...typography.md,
  },
}));

export default NotificationScreen;
