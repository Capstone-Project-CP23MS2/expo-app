import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { UseGetActivities } from '@/hooks/useAPI';
import { useRouter } from 'expo-router';

export default function ActivityCalendar() {
  const { data } = UseGetActivities({});
  const { activities, paginationData } = data || {};
  const router = useRouter();

  const inputData = activities;

  const transformedData = inputData?.reduce((acc, event) => {
    const { dateTime, ...eventData } = event;
    const eventDate = dateTime.split('T')[0];

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }

    const newEvent = {
      id: event.activityId,
      name: event.title,
      day: event.dateTime.split('T')[0],
      height: 50,
    };

    acc[eventDate].push(newEvent);

    return acc;
  }, {});

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <Pressable
        style={[styles.item, { height: reservation.height, elevation: 2, overflow: 'hidden' }]}
        onPress={() => router.push(`/activities/${reservation.id}`)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
        <Text style={{ fontSize, color }}>{reservation.day}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={transformedData}
        renderItem={renderItem}
        showOnlySelectedDayItems
        showClosingKnob={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
