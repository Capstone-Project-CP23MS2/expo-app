import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import AppButton from '@/modules/shared/AppButton'

type Prop = {
  onCreateAccount: any
  isCompleted: boolean
}

export default function RegisterFooter({ onCreateAccount, isCompleted }: Prop) {
  const { styles, breakpoint } = useStyles(stylesheet)

  return (
    <View style={styles.container}>
      <AppButton label="Create User" onPress={onCreateAccount} enabled={isCompleted} />
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    // backgroundColor: theme.colors.background,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
}))
