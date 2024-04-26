import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { COLORS } from '@/constants';
import typography from 'react-native-ui-lib/src/style/typography';

const status = [
  {
    name: 'ALL',
    label: 'ทั้งหมด',
  },
  {
    name: 'GOING',
    label: 'กำลังเริ่ม',
  },
  {
    name: 'PAST',
    label: 'ผ่านไปแล้ว',
  },
];

interface Props {
  onStatusChanged: (category: string) => void;
}

export default function StatusListView({ onStatusChanged }: Props) {
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectStatus = (index: number) => {
    setActiveIndex(index);
    onStatusChanged(status[index].name);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {status.map((item, index) => (
        <TouchableOpacity
          ref={el => (itemsRef.current[index] = el)}
          key={index}
          style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
          onPress={() => selectStatus(index)}
        >
          <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 130,
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
  },

  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    alignItems: 'center',
    width: 280,
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
    ...typography.sm,
    color: COLORS.gray,
  },
  categoryTextActive: {
    ...typography.sm,
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
