import { View, Text, FlatList, Dimensions, Pressable } from 'react-native'
import PlaceItem from './placeItem'
import { useRef, useEffect, useContext } from 'react'
import { SelectMarkerContext } from '@/context/selectMarkerContext'

export default function PlaceListView({ activities, onRegionChange }: any) {
  const flatListRef = useRef(null)
  const { selectedMarker, setSelectedMarker }: any = useContext(SelectMarkerContext)

  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker)
  }, [selectedMarker])

  const scrollToIndex = (index): any => {
    flatListRef.current?.scrollToIndex({ animated: true, index })
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  })

  const handlePlaceSelect = (place: any) => {
    const newRegion = {
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0421,
    }
    onRegionChange(newRegion)
  }

  return (
    <View>
      <FlatList
        data={activities}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem place={item} onPlaceChange={handlePlaceSelect} />
            {/* <Pressable onPress={() => handlePlaceSelect(item)}>
            </Pressable> */}
          </View>
        )}
      />
    </View>
  )
}
