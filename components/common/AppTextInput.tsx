import React, { ReactNode } from 'react'
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
  ...props
}: Props) => {
  const [hidePassword, setHidePassword] = React.useState(password)
  const [isFocused, setIsFocused] = React.useState(false)
  const { maxLength, error } = props
  console.log(props)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          // {
          //   borderColor: error ? COLORS.red : isFocused ? COLORS.darkBlue : COLORS.light,
          // },
        ]}
      >
        {/* <Icon name={iconName} style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }} /> */}
        <MaterialIcons
          name={iconName}
          style={styles.icon}
          // size={size}
          // color={color}
        />
        {/* {icon && <View style={{ marginRight: 10 }}>{icon}</View>} */}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          autoCorrect={false}
          secureTextEntry={hidePassword}
          editable={!disabled}
          {...props}
        />
        {password && (
          <MaterialIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'visibility' : 'visibility-off'}
            style={{ color: COLORS.darkBlue, fontSize: 22, marginRight: 10 }}
            // size={size}
            // color={color}
          />
        )}
      </View>

      <View style={styles.helpersWrapper}>
        <Text style={styles.helper}>{error?.message}</Text>
        {showCharCounter && (
          <Text style={styles.counterHelper}>
            {value?.length || 0} / {maxLength}
          </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },

  label: {
    // marginVertical: 5,
    fontSize: 14,
    // color: COLORS.grey,
  },
  inputContainer: {
    height: 48,
    // backgroundColor: COLORS.light,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    // color: COLORS.darkBlue,
    // outlineStyle: 'none',
  },

  icon: {
    // color: COLORS.darkBlue,
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
    // flexShrink: 1,
    color: COLORS.red,
  },
  counterHelper: {
    textAlign: 'right',
    flexGrow: 1,
    // alignItems: 'flex-end',
  },
})

export default Input
