import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Button, Colors } from 'react-native-ui-lib'
import { RNUIButton } from '@/components'
import { UseDeleteUser } from '@/hooks/useAPI'

type Props = {}

export default function ManagementAccountScreen(props: Props) {
  const { styles } = useStyles(stylesheet)
  const deleteMutation = UseDeleteUser()
  return (
    <View>
      <Text style={styles.title}>ลบบัญชี</Text>
      <RNUIButton label="ยืนยันการลบบัญชี" color="danger" />
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {},
  title: {
    ...theme.typography.h5,
  },
}))
