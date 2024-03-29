import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Button, ButtonProps } from 'react-native-ui-lib'

type Props = ButtonProps & {
  error?: { message?: string }
}

//showCharCounter

export default function RNUIButton(props: Props) {
  const { styles } = useStyles(stylesheet)
  const { error, ...restProps } = props

  return (
    <Button
      style={styles.container}
      iconStyle={styles.icon}
      labelStyle={styles.label}
      {...restProps}
    />
  )
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    paddingVertical: spacings.md,
    width: '100%',
  },
  icon: {},
  label: {
    ...typography.mdB,
  },
}))
