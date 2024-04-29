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
import { UseGetActivities, UseGetActivitiesMap } from '@/hooks/useAPI';
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
import { Stack, useRouter, useNavigation } from 'expo-router';
import ExploreHeader from '@/modules/dev-test/ExploreHeader';
import { useLocationContext } from '@/context/locationContext';
// import * as Location from 'expo-location';

type Props = {};
const INITIAL_REGION = {
  latitude: 13.651897912721727,
  longitude: 100.49401592535224,
  latitudeDelta: 0.0422,
  longitudeDelta: 0.0421,
};
const ExploreMap = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);

  const { location, isLoading, error } = useLocation();
  console.log('🍞location', location);

  const { data: activities } = UseGetActivitiesMap({
    lat: location?.coords.latitude,
    lng: location?.coords.longitude,
    radius: 5000,
  });

  const { data: places, refetch } = UseGetPlacesMap({
    lat: location?.coords.latitude,
    lng: location?.coords.longitude,
    radius: 5000,
  });
  // router.
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
          {activities?.map((activity: Activity) => (
            <Marker
              key={activity.activityId}
              identifier={String(activity.location.locationId)}
              coordinate={{
                latitude: activity.location.latitude,
                longitude: activity.location.longitude,
              }}
              onPress={onMarkerPress}
            />
          ))}
        </MapView>
        <View style={styles.testCard}>
          <RNUIButton
            label="Focus"
            onPress={() =>
              // focusMap({
              //   latitude: 13.75633,
              //   longitude: 100.501765,
              // })
              refetch()
            }
          />
          <RNUIButton label="BTSheet" onPress={handlePresentModalOpenPress} />
          {/* <RNUIButton label="Location" onPress={} /> */}
        </View>
      </View>
      <ListingsBottomSheet />
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

export default ExploreMap;
