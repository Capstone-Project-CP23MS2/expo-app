import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { useEffect, useRef, useState } from 'react'
import { FONT } from '@/constants'
import { checkImageURL } from '@/utils'
// import {
//   BottomSheetFlatList,
//   BottomSheetFlatListMethods,
// } from "@gorhom/bottom-sheet";

interface Props {
  listings: any[]
  refresh: number
  category: string
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<FlatList>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop()
    }
  }, [refresh])

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      {' '}
      //TODO test
      <Pressable>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          {/* <Image
            source={{
              uri: checkImageURL(item?.employer_logo)
                ? item.employer_logo
                : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
            }}
            resizeMode="contain"
            style={styles.logoImage}
          /> */}
          <Animated.Image
            source={{
              uri: checkImageURL(item?.medium_url)
                ? item.medium_url
                : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
            }}
            // source={{ uri: item?.medium_url }}
            style={styles.image}
          />
          <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontFamily: FONT.semiBold }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: FONT.semiBold }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>
          <Text style={{ fontFamily: FONT.regular }}>{item.room_type}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: FONT.semiBold }}>€ {item.price}</Text>
            <Text style={{ fontFamily: FONT.regular }}>night</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  )

  return (
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: FONT.semiBold,
    fontSize: 16,
    marginTop: 4,
  },
})

export default Listings
