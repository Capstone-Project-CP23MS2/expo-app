import { StyleSheet, Text, View, Button } from 'react-native'
import Auth from '@/components/Auth'

type Props = {}

const login = (props: Props) => {
  const { Auth } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Auth />
    </View>
  )
}

export default login
// export { default } from '@/components/home/page';
