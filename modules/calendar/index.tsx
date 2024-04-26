import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { UseGetActivities } from '@/hooks/useAPI';
import { useRouter } from 'expo-router';
import { SIZES } from '@/constants';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TouchableOpacity, Chip } from 'react-native-ui-lib';

export default function ActivityCalendar() {
  const { styles } = useStyles(stylesheet);
  const { data } = UseGetActivities({});
  const { activities } = data || {};
  const router = useRouter();

  const inputData = activities;

  console.log(inputData);

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
      location: event.location.name,
      participants: event.memberCounts,
      allParticipants: event.noOfMembers,
    };

    acc[eventDate].push(newEvent);

    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Agenda
        items={transformedData}
        renderItem={(reservation: AgendaEntry) => {
          return (
            <TouchableOpacity
              onPress={() => router.push(`/activities/${reservation.id}`)}
              style={styles.secondContainer}
              activeOpacity={0.6}
            >
              <View>
                <Text style={styles.title}>{reservation.name}</Text>
                <View style={styles.chipsList}>
                  <Chip label={`${reservation.participants}/${reservation.allParticipants}`} />
                </View>
                <View style={styles.placeContainer}>
                  <Text style={styles.textDescription}>{reservation.location}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        showOnlySelectedDayItems
        showClosingKnob={true}
        renderEmptyData={() => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.emptyTitle}>ไม่พบกิจกรรมวันนี้</Text>
            <Text style={styles.emptySub}>สร้างกิจกรรมของคุณหรือเข้าร่วมของคนอื่น !</Text>
          </View>
        )}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
  secondContainer: {
    padding: spacings.lg,
    borderRadius: spacings.md,
    marginRight: 15,
    marginTop: 12,
    marginBottom: 5,
    backgroundColor: '#FFF',
    elevation: 3,
  },
  title: {
    ...typography.mdB,
  },
  textDatetime: {
    ...typography.xsB,
    color: colors.primary,
  },
  chipsList: {
    flexDirection: 'row',
    gap: spacings.xs,
    marginBottom: spacings.xs,
  },
  textDescription: {
    ...typography.xsB,
    color: '#888693',
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacings.xs,
  },
  emptyTitle: {
    ...typography.lgB,
  },
  emptySub: {
    ...typography.md,
  },
}));
