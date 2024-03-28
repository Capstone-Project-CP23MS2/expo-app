import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import AppTextInput from '@/modules/shared/AppTextInputOld'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Chip, Searchbar } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
        <Searchbar
          style={{ maxWidth: 'auto' }}
          placeholder="Search"
          onChangeText={onSearchChanged}
          value={searchQuery}
        />
        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Chip
            style={{ borderRadius: 24 }}
            icon={props => <MaterialCommunityIcons {...props} name="chevron-down" size={24} />}
            onPress={() => onFilterPress()}
          >
            Filter
          </Chip>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    // padding: theme.spacings.md,
    // backgroundColor: theme.colors.background,
    // backgroundColor: '#fff',
    elevation: 4,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // shadowOffset: {
    //   width: 1,
    //   height: 10,
    // },
    flexDirection: 'row',
    alignItems: 'center',

    padding: theme.spacings.md,
    backgroundColor: theme.colors.background, // Adjust background color as needed
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
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
