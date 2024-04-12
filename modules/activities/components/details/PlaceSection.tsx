import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Place } from '@/api/places/places.type';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  place?: Place;
};

const PlaceSection = ({ place }: Props) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="map-marker-outline" size={24} color="black" />
      </View>
      <View style={styles.content}>
        <View style={styles.placeNameWrapper}>
          <Text style={styles.placeName}>{place?.name} </Text>
          <Text>8.8 กม.</Text>
        </View>

        <Text style={styles.location} numberOfLines={1}>
          ติวเตอร์ แอ็กชั่น สถาปัตย์ แบดดีไซน์เนอร์แทงโก้ เวิร์คโปรโมเตอร์อัตลักษณ์อิเลียด
          โหลยโท่ยม้งแพกเกจแจ็กพ็อตโยโย่
        </Text>
      </View>
      <View style={styles.footer}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: spacings.md,
    // backgroundColor: 'white',
    borderRadius: spacings.md,
  },
  content: {
    marginLeft: spacings.md,
    flexGrow: 1,
    flexShrink: 1,
    // flexWrap: 'wrap',
  },
  placeNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  placeName: {
    ...typography.mdB,
  },
  location: {
    ...typography.sm,
    color: colors.gray,
    // flexWrap: 'wrap',
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'white',
    borderRadius: spacings.sm / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    // flexGrow: 1,
    // flexShrink: 0,
  },
}));

export default PlaceSection;
