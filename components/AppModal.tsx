import { View, Text, Modal, Alert } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { ModalProps } from 'react-native-ui-lib'
import RNUIButton from './RNUIButton'

type Props = ModalProps & {
  isOpen: boolean
  withInput?: boolean
}

export default function AppModal({ isOpen, ...rest }: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <Modal
      // statusBarTranslucent
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        // setModalVisible(!modalVisible)
      }}
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}></View>
        <RNUIButton label="RNUIButton" />
      </View>
    </Modal>
  )
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  content: {
    padding: spacings.md,
  },
}))
