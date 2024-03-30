import { View, Text, FlatList, Dimensions } from 'react-native'
import PlaceItem from './placeItem'
import { useRef, useEffect, useContext } from 'react'
import { SelectMarkerContext } from '@/context/selectMarkerContext'

export default function PlaceListView({ activities }: any) {
  const flatListRef = useRef(null)
  const { selectedMarker, setSelectedMarker }: any = useContext(SelectMarkerContext)

  useEffect(() => {
    selectedMarker && scrollToIndex(2)
  }, [selectedMarker])

  const scrollToIndex = (index): any => {
    flatListRef.current?.scrollToIndex({ animated: true, index })
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  })

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
            <PlaceItem place={item} />
          </View>
        )}
      />
    </View>
  )
}
