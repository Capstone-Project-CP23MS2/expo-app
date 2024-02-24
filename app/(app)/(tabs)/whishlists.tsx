import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import categories from '@/modules/test/demo/components/ExploreHeader/categories'
import { Stack, Link, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { COLORS, SIZES } from '@/constants'
import ActivityCard from '@/modules/activities/components/Card'
import { Button, FAB } from 'react-native-paper'
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles'
import AppButton from '@/modules/shared/AppButton'

type Props = {}

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  )
}

export default function Page(props: Props) {
  const router = useRouter()
  const navigation = useNavigation()
  const { styles, breakpoint } = useStyles(stylesheet)

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Unistyles example</Text>
          <AppButton
            label="Toggle Theme"
            variant="primary"
            onPress={() =>
              UnistylesRuntime.setTheme(UnistylesRuntime.themeName === 'light' ? 'dark' : 'light')
            }
          />
          <AppButton
            label="Toggle Theme"
            variant="secondary"
            onPress={() =>
              UnistylesRuntime.setTheme(UnistylesRuntime.themeName === 'light' ? 'dark' : 'light')
            }
          />
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
}))
