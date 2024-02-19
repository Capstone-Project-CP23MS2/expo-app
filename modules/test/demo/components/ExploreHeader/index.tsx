import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import categories from './categories';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '@/constants';
import * as Haptics from 'expo-haptics';

import CategoryTab from './CategoryTab';

type Props = {
  onCategoryChanged: (category: string) => void;
};
const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<
    Array<React.ElementRef<typeof TouchableOpacity> | null>
  >([]);
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    // selected?.measureInWindow((x, y, width, height) => {
    //   const halfWindowWidth = windowWidth / 2;
    //   const toX =
    //     x < halfWindowWidth ? x - halfWindowWidth : x + halfWindowWidth;
    //   scrollRef.current?.scrollTo({ x: toX, y: 0, animated: true });
    // });
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity>
              <View style={styles.searchBtn}>
                <MaterialIcons name="search" size={24} />
                <View>
                  <Text style={{ fontFamily: 'NunitoSemiBold' }}>
                    Where to?
                  </Text>
                  <Text
                    style={{ color: COLORS.gray, fontFamily: 'NunitoRegular' }}>
                    Anywhere · Any week
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <MaterialIcons name="tune" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 16,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={el => (itemsRef.current[index] = el)}
              key={index}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
              onPress={() => {
                selectCategory(index);
              }}>
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? '#000' : COLORS.gray}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* <FlatList
          style={{ flex: 1 }}
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryTab
              category={item}
              index={index}
              activeIndex={activeIndex}
            />
          )}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ columnGap: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    height: 'auto',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
  },

  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 260,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
  categoryText: {
    fontSize: SIZES.small,
    fontFamily: FONT.semiBold,
    color: COLORS.gray,
  },
  categoryTextActive: {
    fontSize: SIZES.small,
    fontFamily: FONT.semiBold,
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});
