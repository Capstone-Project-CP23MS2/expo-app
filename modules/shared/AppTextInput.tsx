import React, { ReactNode, useState } from 'react'
import { View, Text, TextInput, StyleSheet, KeyboardType } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '@/constants'

type Props = {
  value?: string
  keyboardType?: KeyboardType
  onFocus?: () => void
  onBlur?: () => void
  onChangeText?: (text: string) => void
  placeholder?: string
  label?: string
  error?: { message?: string }
  disabled?: boolean
  errorMessage?: string
  maxLength?: number
  showCharCounter?: boolean
  iconName?: keyof typeof MaterialIcons.glyphMap
  icon?: ReactNode
  password?: boolean
  placeholderTextColor?: boolean
  textColor?: string
  autoFocus?: boolean

  [key: string]: any
}
const Input = ({
  value,
  onChangeText,
  label,
  iconName,
  icon,
  password,
  showCharCounter,
  disabled,
  placeholderTextColor,
  textColor,
  autoFocus,
  ...props
}: Props) => {
  const [hidePassword, setHidePassword] = useState(password)
  const [isFocused, setIsFocused] = useState(false)
  const { maxLength, error } = props

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && <MaterialIcons name={iconName} style={styles.icon} />}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          autoCorrect={false}
          secureTextEntry={hidePassword}
          editable={!disabled}
          placeholderTextColor={placeholderTextColor ? `${textColor}` : '#c0c0c0'}
          autoFocus={autoFocus}
          {...props}
        />
        {password && (
          <MaterialIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'visibility' : 'visibility-off'}
            style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
          />
        )}
      </View>

      {showCharCounter && (
        <View style={styles.helpersWrapper}>
          <Text style={styles.helper}>{error?.message}</Text>
          <Text style={styles.counterHelper}>
            {value?.length || 0} / {maxLength}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 6,
  },
  label: {
    fontSize: 14,
  },
  inputContainer: {
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
  },
  icon: {
    fontSize: 22,
    marginRight: 10,
  },
  helpersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    fontSize: 14,
  },
  helper: {
    color: COLORS.red,
  },
  counterHelper: {
    textAlign: 'right',
    flexGrow: 1,
  },
})

export default Input
