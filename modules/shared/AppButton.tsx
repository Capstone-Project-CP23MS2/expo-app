import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BaseButton } from 'react-native-gesture-handler'
import { COLORS, FONT, SIZES } from '@/constants'

type Props = {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger'
  label: string
  onPress: () => void
  fullWidth?: true
  round?: true
}

const AppButton = ({ variant, label, onPress, fullWidth }: Props) => {
  return (
    <BaseButton
      onPress={onPress}
      style={[styles.button, { backgroundColor: COLORS[variant] }, fullWidth && { flex: 1 }]}
    >
      <Text style={styles.label}>{label}</Text>
    </BaseButton>
  )
}

export default AppButton

const styles = StyleSheet.create({
  button: {
    // backgroundColor: COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    padding: 14,
  },

  label: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
})
