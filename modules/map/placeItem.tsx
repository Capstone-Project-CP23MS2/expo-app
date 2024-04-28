import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, FONT, SIZES } from '@/constants';
import dayjs from 'dayjs';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AppButton from '../shared/AppButton';
import { useRouter } from 'expo-router';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TouchableOpacity, Chip, Text as RNUIText } from 'react-native-ui-lib';

export default function PlaceItem({ place, onPlaceChange }: any) {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();

  const changePlace = (item: any) => {
    onPlaceChange(item);
  };

  return (
    <View
      style={{
        marginBottom: 20,
        width: Dimensions.get('screen').width,
      }}
    >
      <View style={styles.card}>
        <TouchableOpacity onPress={() => changePlace(place)} style={styles.locate}>
          <FontAwesome5 name="location-arrow" size={15} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.textDatetime}>
          {dayjs(place.dateTime).format('ddd, MMMM D, YYYY h:mm')}
        </Text>
        <Text style={styles.title} numberOfLines={1}>
          {place.title}
        </Text>
        <View style={styles.chipsList}>
          <Chip label={place.categoryName} />
          <Chip label={`${place.users.length}/${place.noOfMembers}`} />
        </View>
        <View style={styles.placeContainer}>
          <Text style={styles.textDescription}>{place.location.name}</Text>
        </View>
        <AppButton
          label="รายละเอียด"
          style={{
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            borderRadius: 15,
            marginTop: 5,
          }}
          onPress={() => router.push(`/activities/${place.activityId}`)}
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    gap: 2,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  locate: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 35,
    width: 35,
    backgroundColor: COLORS.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.lgB,
    width: '80%',
  },
  chipsList: {
    flexDirection: 'row',
    gap: spacings.xs,
    marginBottom: spacings.xs,
  },
  textDatetime: {
    ...typography.xsB,
    color: colors.primary,
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacings.xs,
  },
  textDescription: {
    ...typography.xsB,
    color: '#888693',
  },
}));
