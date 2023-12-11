import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONT } from '@/constants';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  index: number;
  category: {
    name: string;
    icon: string;
  };
  activeIndex: number;
};

const CategoryTab = ({ category, index, activeIndex }: Props) => {
  return (
    <TouchableOpacity
      key={index}
      style={
        activeIndex === index
          ? styles.categoriesBtnActive
          : styles.categoriesBtn
      }>
      <MaterialIcons
        name={category.icon as any}
        size={24}
        color={activeIndex === index ? '#000' : COLORS.gray}
      />
      <Text
        style={
          activeIndex === index
            ? styles.categoryTextActive
            : styles.categoryText
        }>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryTab;

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 14,
    fontFamily: FONT.semiBold,
    color: COLORS.gray,
  },
  categoryTextActive: {
    fontSize: 14,
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
