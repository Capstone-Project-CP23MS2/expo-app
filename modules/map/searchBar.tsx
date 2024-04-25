import { View, Text } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function SearchBarMap() {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search Place Activity"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyAePx_dBntD1rl2iVthBTbpjvCAoSVH4V8',
          language: 'en',
        }}
      />
    </View>
  );
}
