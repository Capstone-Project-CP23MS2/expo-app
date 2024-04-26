import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import AppTextInput from '@/modules/shared/AppTextInputOld';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Chip, TextField } from 'react-native-ui-lib';
import { Chip as ChipPaper, Searchbar as SearchbarPaper } from 'react-native-paper';
import AppChip from '@/components/AppChip';
import Search from '@/app/(app)/activities/search';
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
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacings.llg,
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
