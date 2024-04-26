import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AppChip from '@/components/AppChip';
import SearchBar from './SearchBar';

type Props = {
  searchQuery: string;
  onSearchChanged: (terms: string) => void;
  onFilterPress?: () => void;
};
export default function ExploreFilter({ searchQuery, onSearchChanged, onFilterPress }: Props) {
  const { styles } = useStyles(stylesheet);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, gap: 8 }}>
        <View style={{ flexDirection: 'row' }}>
          <SearchBar searchQuery={searchQuery} onSearchChanged={onSearchChanged} />
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
            gap: 8,
          }}
        >
          <AppChip
            label="ตัวเลือก"
            onPress={() => console.log('pressed')}
            color="secondary"
            // leftElement={<MaterialCommunityIcons name="tune" size={20} color="black" />}
            leftIcon="tune"
            RightIcon="chevron-down"
            onPressOut={onFilterPress}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(({ spacings, typography, colors }) => ({
  container: {
    // padding: spacings.md,
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

    padding: spacings.md,
    backgroundColor: colors.background, // Adjust background color as needed
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
  },
  text: {
    ...typography.md,
    color: colors.typography,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: colors.background,
  },
  label: {
    ...typography.sm,
    lineHeight: 20,
  },
  withFrame: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 2,
  },
}));
