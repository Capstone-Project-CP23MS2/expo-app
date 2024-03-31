import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Chip } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler'
import AppTextInput from '@/modules/shared/AppTextInput'
import { MaterialIcons } from '@expo/vector-icons'
import { COLORS, FONT } from '@/constants'

type Props = {
  searchQuery: string
  onSearchChanged: (terms: string) => void
  onFilterPress: () => void
}
export default function SearchHeader({ searchQuery, onSearchChanged, onFilterPress }: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, gap: 8 }}>
        <AppTextInput
          value={searchQuery}
          onChangeText={onSearchChanged}
          placeholder="Explore available activities."
          icon
          iconName="search"
          autoFocus={true}
        />
        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Chip
            borderRadius={10}
            label={'Categories'}
            labelStyle={{ color: COLORS.black, fontWeight: 'normal' }}
            onPress={() => onFilterPress()}
            containerStyle={{
              borderColor: '#c0c0c0',
            }}
            // rightIconSource={<MaterialCommunityIcons name="chevron-down" />}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.colors.background, // Adjust background color as needed
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
}))
