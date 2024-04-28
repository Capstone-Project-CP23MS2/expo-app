import { View, Text, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import MapView, {
  LatLng,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { AppBottomSheetModal, RNUIButton } from '@/components';
import MapViewStyle from '@/assets/data/map-view-style.json';
import { UseGetActivities } from '@/hooks/useAPI';
import { Activity } from '@/api/activities/type';
import { UseGetPlaces, UseGetPlacesMap } from '@/hooks/useAPI/places';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import ActivityListMapBottomSheet from '@/modules/activities/components/map/ActivityListMapBottomSheet';
import { Place } from '@/api/places/places.type';
import { useLocation } from '@/hooks/useLocation';
import { isLoading } from 'expo-font';
import AppLoaderScreen from '@/components/AppLoaderScreen';
import { placesMockup } from '@/assets/data/examples/places';
import ListingsBottomSheet from '@/modules/activities/components/map/ListingsBottomSheet';
import { Stack } from 'expo-router';
import ExploreHeader from '@/modules/dev-test/ExploreHeader';
import { useLocationContext } from '@/context/locationContext';
// import * as Location from 'expo-location';

type Props = {};
const INITIAL_REGION = {
  latitude: 13.75633,
  longitude: 100.501765,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0421,
};
const DevMap = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);

  const { location, isLoading, error, getLocation } = useLocationContext();
  console.log('😂location', getLocation());
  console.log('🍞location', location);
  const { data } = UseGetActivities({});
  const { activities } = data || {};

  const { data: places } = UseGetPlacesMap({
    lat: location?.coords.latitude,
    lng: location?.coords.longitude,
    radius: 1000,
  });

  // console.log(location?.coords.longitude);

  // console.log(places);

  const focusMap = (coord: LatLng) => {
    mapRef.current?.animateCamera({ center: coord, zoom: 16 }, { duration: 750 });
  };

  // const onRegionChange = (region: Region) => {
  //   console.log('® region', region);
  // };

  const onMarkerPress = (marker: MarkerPressEvent) => {
    const { nativeEvent: markerInfo, timeStamp } = marker;
    focusMap(markerInfo.coordinate);
    setSelectedPlace(markerInfo.id);
    console.log('marker', markerInfo);
  };

  const onTest = (value: any) => {
    console.log('-------test-------');
    console.log(value.name);
    console.log('------------------');
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { dismiss } = useBottomSheetModal();

  const handlePresentModalOpenPress = () => bottomSheetModalRef.current?.present();
  const handlePresentModalClosePress = () => bottomSheetModalRef.current?.close();

  // const getMyLocation = async () => {
  //   let location = await Location.getCurrentPositionAsync({});
  //   console.log('location');
  //   console.log(location);

  //   // const region = {
  //   //   latitude: location.coords.latitude ?? 13.75633,
  //   //   longitude: location.coords.longitude ?? 100.501765,
  //   //   latitudeDelta: 0.2,
  //   //   longitudeDelta: 0.2,
  //   // };

  //   // mapRef.current?.animateToRegion(region);
  // };
  // const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    if (error) {
      return setInitialRegion(INITIAL_REGION);
    }
    if (!location) {
      return;
    }
    if (!initialRegion) {
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });
    }
  }, [location, initialRegion, setInitialRegion, error]);

  if (isLoading) {
    return <AppLoaderScreen />;
  }

  return (
    <>
      {/* <Stack.Screen
        options={{
          header: () => <Text>Header</Text>,
        }}
      /> */}
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          showsUserLocation
          followsUserLocation
          // onRegionChange={onRegionChange}
          onMarkerPress={onTest}
          // customMapStyle={MapViewStyle}
        >
          {places?.map((place: Place) => (
            <Marker
              key={place.locationId}
              identifier={String(place.locationId)}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              onPress={onMarkerPress}
            />
          ))}
          {placesMockup?.map((place: Place) => (
            <Marker
              key={place.locationId}
              identifier={String(place.locationId)}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              onPress={onMarkerPress}
            />
          ))}
        </MapView>
        <View style={styles.testCard}>
          <RNUIButton
            label="Focus"
            onPress={() =>
              focusMap({
                latitude: 13.75633,
                longitude: 100.501765,
              })
            }
          />
          <RNUIButton label="BTSheet" onPress={handlePresentModalOpenPress} />
          {/* <RNUIButton label="Location" onPress={} /> */}
        </View>
      </View>
      <ListingsBottomSheet />
      <ActivityListMapBottomSheet ref={bottomSheetModalRef} placeId={selectedPlace} />
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  testCard: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    padding: spacings.md,
    flexDirection: 'row',
  },
}));

export default DevMap;
