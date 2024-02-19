import { StyleSheet, Text, View, Button } from 'react-native'
import Auth from '@/modules/auth/Auth'

const login = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Auth />
    </View>
  )
}

export default login
