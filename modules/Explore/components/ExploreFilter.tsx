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
import Searchbar from './Searchbar';

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
          <Searchbar searchQuery={searchQuery} onSearchChanged={onSearchChanged} />
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
            // leftElement={<MaterialCommunityIcons name="tune" size={20} color="black" />}
            leftIcon="tune"
            RightIcon="chevron-down"
            onPressOut={onFilterPress}
            iconStyle={{ padding: 40 }}
          />
          <AppChip
            label="ตัวเลือก"
            onPress={() => console.log('pressed')}
            // leftElement={<MaterialIcons name="tune" size={20} color="black" />}
            onPressOut={onFilterPress}
          />
          <ChipPaper
            style={{ borderRadius: 24 }}
            icon={props => <MaterialCommunityIcons {...props} name="chevron-down" size={24} />}
            onPress={() => console.log('Pressed')}
            textStyle={styles.label}
          >
            Sort
          </ChipPaper>
        </ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <ChipPaper
            style={{ borderRadius: 24, borderWidth: 0 }}
            icon="tune"
            closeIcon={props => <MaterialCommunityIcons {...props} name="close" size={24} />}
            onPress={() => console.log('Pressed')}
            textStyle={{ fontSize: 12 }}
          >
            Example Chip
          </ChipPaper>
          <ChipPaper
            style={{ borderRadius: 24, borderWidth: 0 }}
            onPress={() => console.log('Pressed')}
            textStyle={{ fontSize: 12 }}
          >
            Example Chip
          </ChipPaper>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(({ spacings, typography, colors }) => ({
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
