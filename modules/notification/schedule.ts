import * as Notifications from 'expo-notifications';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(title: string = "You've got notification! 🔔", body: string = 'Here is the notification body', time: number) {
  let date = new Date()
  date.setSeconds(date.getSeconds() + 10)
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { data: 'goes here' },
      },
      trigger: { date: date },
    });
    console.log(`Notification scheduled: ${title}`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}

export async function scheduleNotification(title: string, body: string, time: number) {
  await schedulePushNotification(title, body, time);
}