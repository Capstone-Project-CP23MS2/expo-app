import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  title: string
  onPress?: ((props?: any) => any & ((props: any) => any)) | undefined
  // icon: string
  // id: string
}

export default function ProfileSettingListItem({ title, onPress }: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <Pressable style={styles.container} onPress={onPress} android_ripple={{ color: 'gray' }}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </View>
    </Pressable>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.spacings.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacings.lg,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
  },

  title: {
    ...theme.typography.md,
  },
}))
