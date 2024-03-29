import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Button, Colors } from 'react-native-ui-lib'

type Props = {}

export default function ManagementAccountScreen(props: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <View>
      <Text style={styles.title}>ลบบัญชี</Text>
      <Button
        label="Red Outline"
        outline
        outlineWidth={3}
        outlineColor={Colors.$outlineDanger}
        style={{ marginBottom: 20 }}
      />
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {},
  title: {
    ...theme.typography.h5,
  },
}))
