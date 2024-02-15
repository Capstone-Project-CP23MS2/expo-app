import { StyleSheet, Text, View, TextInput, KeyboardType } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'
import { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
type Props = {
  value?: string
  keyboardType?: KeyboardType
  onBlur?: () => void
  onChangeText?: (text: string) => void
  placeholder?: string
  icon?: ReactNode
  label?: string
  error?: { message?: string }
  disabled?: boolean
  errorMessage?: string
  maxLength?: number
  showCharCounter?: boolean
}

const AppTextInput = ({
  value,
  keyboardType,
  onBlur,
  onChangeText,
  placeholder,
  icon,
  label,
  error,
  disabled,
}: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <TextInput
          keyboardType={keyboardType}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          // style={{borderColor: error ? 'red' : 'black',}}
          editable={!disabled}
        />
      </View>
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 8,
    fontSize: 16,
    flex: 1,
  },
})

export default AppTextInput
