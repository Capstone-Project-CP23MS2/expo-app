import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Chip, MD3Colors } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { FlashList } from '@shopify/flash-list';
import FiltersCategoryList from '../components/filters/FiltersCategoryList';
import { UseGetCategories } from '@/hooks/useAPI';
import { Slider } from 'react-native-ui-lib';
import { RNUIButton } from '@/components';
import { FiltersCategoryListItemPressHandler } from '../components/filters/FiltersCategoryListItem';
import { useFilterStore } from '../stores/filter-store';
import { useRouter } from 'expo-router';
import { SliderRef } from 'react-native-ui-lib/src/incubator';
import { set } from 'react-hook-form';

type Props = {};

const FilterScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);

  const router = useRouter();
  const { data } = UseGetCategories();
  const { categories } = data || {};

  const { filters, setFilters, onFiltersReset } = useFilterStore(state => ({
    filters: state.filters,
    setFilters: state.setFilters,
    onFiltersReset: state.reset,
  }));

  const sliderRef = React.useRef<SliderRef>(null);
  const [distance, setDistance] = React.useState<number>(filters.distance || 5);
  const initialSliderValue = filters.distance;

  const [categoryFilterState, setCategoryFilterState] = useState<(number | undefined)[]>(
    filters.categoryIds || [],
  );

  const handleCategorySelect: FiltersCategoryListItemPressHandler = ({ categoryId, index }) => {
    setCategoryFilterState(prevState => {
      const newState = [...prevState];
      const isSelected = newState[index];
      newState[index] = isSelected ? undefined : categoryId;
      return newState;
    });
  };

  const handleSearch = () => {
    setFilters({
      categoryIds: categoryFilterState.filter(x => x !== undefined) as number[],
      distance,
    });
    router.push('/explore');
  };

  const handleReset = () => {
    onFiltersReset();
    setCategoryFilterState([]);
    setDistance(5);
    sliderRef.current?.reset();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }} style={{ flex: 1 }}>
        <Text style={styles.heading}>ระยะทางภายใน {distance.toFixed()} กิโล</Text>
        <Slider
          ref={sliderRef}
          value={initialSliderValue}
          onValueChange={setDistance}
          minimumValue={0}
          maximumValue={50}
          step={1}
          containerStyle={styles.sliderContainer}
          // disableRTL={forceLTR}
          // ref={this.slider}
          onReset={this.onSliderReset}
        />

        <Text style={styles.heading}>ประเภท</Text>

        <View style={{ height: '100%' }}>
          <FiltersCategoryList
            onCategorySelect={handleCategorySelect}
            categoryFilterState={categoryFilterState}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <RNUIButton label="ล้างค่า" color="disable" onPress={handleReset} />
        <RNUIButton label="ค้นหา" onPress={handleSearch} />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography, component }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    ...typography.h5,
    marginVertical: spacings.md,
  },
  listGap: {
    height: spacings.sm,
  },
  sliderContainer: {
    flex: 1, // NOTE: to place a slider in a row layout you must set flex in its 'containerStyle'!!!
    marginHorizontal: spacings.md,
  },
  footer: {
    ...component.footer,
    flexDirection: 'row',
    gap: spacings.md,
  },
}));

export default FilterScreen;
