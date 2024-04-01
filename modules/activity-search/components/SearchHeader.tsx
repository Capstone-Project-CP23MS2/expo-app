import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Chip } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler'
import AppTextInput from '@/modules/shared/AppTextInput'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
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
      <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <AppTextInput
            value={searchQuery}
            onChangeText={onSearchChanged}
            placeholder="Explore available activities."
            icon
            iconName="search"
            autoFocus={true}
          />
        </View>
        <Pressable
          style={{
            borderRadius: 10,
            borderColor: '#c0c0c0',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            backgroundColor: 'white',
          }}
          onPress={() => onFilterPress()}
        >
          <Ionicons name="filter" size={24} color="black" />
        </Pressable>
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
