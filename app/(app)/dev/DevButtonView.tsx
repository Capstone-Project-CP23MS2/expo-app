import { View, Text } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { RNUIButton } from '@/components'
import { Button } from 'react-native-ui-lib'

type Props = {}

export default function DevButtonView(props: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <View style={styles.container}>
      <Text>Button</Text>
      <View style={styles.listContainer}>
        <RNUIButton label="Contained" type="contained" />
        <RNUIButton label="Outlined" type="outlined" />
        <RNUIButton label="Text" type="text" />
        <RNUIButton label="Hello" />
      </View>
      <View style={styles.listContainer}>
        <RNUIButton label="Primary" color="primary" />
        <RNUIButton label="Secondary" color="secondary" />
        <RNUIButton label="Tertiary" color="tertiary" />
        <RNUIButton label="Danger" color="danger" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Button label={'Press'} size={Button.sizes.large} />
        <Button label={'Press'} outline outlineWidth={4} size={Button.sizes.large} />
      </View>
    </View>
  )
}

const stylesheet = createStyleSheet(({ colors, spacings }) => ({
  container: {},
  listContainer: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginVertical: spacings.md,
    gap: spacings.sm,
    paddingHorizontal: spacings.md,
  },
}))
