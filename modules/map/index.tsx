import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import PlaceListView from './placeListView';
import SearchBarMap from './searchBar';
import { UseGetActivities } from '@/hooks/useAPI';
import { SelectMarkerContext } from '@/context/selectMarkerContext';
import Markers from './markers';
import * as Location from 'expo-location';
import MapViewStyle from '@/assets/data/map-view-style.json';

const INITIAL_REGION = {
  latitude: 13.75633,
  longitude: 100.501765,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0421,
};

const index = () => {
  const { data } = UseGetActivities({});
  const { activities, paginationData } = data || {};

  const [selectedMarker, setSelectedMarker] = useState([]);
  const [region, setRegion] = useState(INITIAL_REGION);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    onLocateMe();
  }, []);

  const handleRegionChange = (newRegion: any) => {
    setRegion(newRegion);
  };

  const onLocateMe = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    const region = {
      latitude: location.coords.latitude ?? 13.75633,
      longitude: location.coords.longitude ?? 100.501765,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    };

    mapRef.current?.animateToRegion(region);
  };

  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <SearchBarMap onSearchPlaceChange={handleRegionChange} />
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={INITIAL_REGION}
          ref={mapRef}
          region={region}
          customMapStyle={MapViewStyle}
        >
          {activities.map((item, index) => (
            <Markers key={index} place={item} index={index} />
          ))}
        </MapView>
        <View style={styles.placelist}>
          <PlaceListView activities={activities} onRegionChange={handleRegionChange} />
        </View>
      </View>
    </SelectMarkerContext.Provider>
  );
};

export default index;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  placelist: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 10,
    width: '100%',
  },
});
