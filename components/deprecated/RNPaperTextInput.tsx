import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { HelperText, TextInput, TextInputProps } from 'react-native-paper'

type Props = TextInputProps & {
  // maxLength: number
  fieldError?: { message?: string }
}

export default function AppTextInputTest(props: Props) {
  const { fieldError, ...restProps } = props
  const { styles } = useStyles(stylesheet)

  return (
    <View style={styles.inputContainerStyle}>
      <TextInput {...restProps} />
      <View style={styles.helpersWrapper}>
        <HelperText type="info" visible style={styles.counterHelper}>
          {props.value ? props.value.length : 0} / {props.maxLength}
        </HelperText>

        <HelperText type="error" style={styles.helper}>
          {fieldError?.message}
        </HelperText>
      </View>
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {},
  helper: {
    flexShrink: 1,
    theme: theme.typography.xs,
  },
  helpersWrapper: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  counterHelper: {
    textAlign: 'right',
    theme: theme.typography.xs,
  },
  inputContainerStyle: {
    // margin: 8,
  },
}))
