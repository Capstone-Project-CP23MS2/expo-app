import { StyleSheet, Text, View, Button } from 'react-native'
import { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Auth from '@/modules/auth/Auth'

type Props = {}

const login = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Auth />
    </View>
  )
}

export default login
// export { default } from '@/components/home/page';
