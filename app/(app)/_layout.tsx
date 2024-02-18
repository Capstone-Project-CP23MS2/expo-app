import { Redirect, Slot } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'

function AppLayout() {
    const { isLoading, user }= true
    if (isLoading) {
      return <ActivityIndicator animating={true} color={'black'} />
    }

    if (!user) {
        return <Redirect href="/login"/>
    }
    return <Slot />
}

export default AppLayout
