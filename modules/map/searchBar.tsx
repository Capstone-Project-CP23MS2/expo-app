import { View, Text } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBarMap({ onSearchPlaceChange }: any) {
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
        placeholder="Search Place Activity"
        fetchDetails={true}
        onPress={(data, details = null) => {
          handleSearchPlaceSelect(details.geometry.location);
        }}
        query={{
          key: 'AIzaSyCvZG2drhKhn6mBfNj_9YKHEH-Y7WYK36g',
          language: 'en',
        }}
      />
    </View>
  );
}
