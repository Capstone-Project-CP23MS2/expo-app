import { View } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FONT } from '@/constants';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBarMap({ onSearchPlaceChange }: any) {
  const { styles } = useStyles(stylesheet);
  const handleSearchPlaceSelect = (place: any) => {
    const newRegion = {
      latitude: place?.lat,
      longitude: place?.lng,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0421,
    };
    onSearchPlaceChange(newRegion);
  };

  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="ค้นหาพื้นที่กิจกรรม"
        fetchDetails={true}
        onPress={(data, details = null) => {
          handleSearchPlaceSelect(details?.geometry?.location);
        }}
        styles={{
          textInput: { fontFamily: FONT.medium },
        }}
        query={{
          key: 'AIzaSyCvZG2drhKhn6mBfNj_9YKHEH-Y7WYK36g',
          language: 'th',
          components: 'country:th',
        }}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({}));
