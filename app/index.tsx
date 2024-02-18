import { StyleSheet, Text, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Auth from '@/modules/auth/Auth'

type Props = {}

const index = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Auth />
    </View>
  )
}

export default index
// export { default } from '@/components/home/page';
const styles = StyleSheet.create({})
