import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/modules/test/demo/components/ExploreHeader'
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/modules/test/demo/components/ListingsMap'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsBottomSheet from '@/modules/test/demo/components/ListingsBottomSheet'
import Listings from '@/modules/test/demo/components/Listings'

type Props = {}

const Page = (props: Props) => {
  const items = useMemo(() => listingsData as any, [])
  const getoItems = useMemo(() => listingsDataGeo, [])
  const [category, setCategory] = useState<string>('Tiny homes')

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    // <View>
    //   <Link href={"/(modals)/login"}>Login</Link>
    //   <Link href={"/(modals)/booking"}>Booking</Link>
    //   <Link href={"/listing/1337"}>Listing details</Link>
    // </View>
    <View style={{ flex: 1, marginTop: 0 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} refresh={0} category={category} />
      <ListingsMap />
      <ListingsBottomSheet />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})
