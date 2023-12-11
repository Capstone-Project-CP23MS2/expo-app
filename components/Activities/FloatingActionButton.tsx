import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '@/constants';
type props = {
  handleNavigate: () => void;
};
const FloatingActionButton = ({ handleNavigate }: props) => {
  return (
    <View style={styles.addBtnContainer}>
      <BaseButton style={styles.addBtn} onPress={handleNavigate}>
        <MaterialIcons name="add" size={24} color={COLORS.white} />
      </BaseButton>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  addBtnContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addBtn: {
    // position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xxLarge,
    // elevation: 3,
  },
});
