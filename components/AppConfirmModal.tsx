import { View, Text, Modal, ModalProps, Pressable } from 'react-native'
import React, { useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import RNUIButton from './RNUIButton'

type Props = ModalProps & {
  title?: string
  desc?: string
  onConfirm: () => void
  onCancel: () => void
}

export default function AppConfirmModal({
  title = 'Header',
  desc,
  onConfirm,
  onCancel,
  ...rest
}: Props) {
  const { styles } = useStyles(stylesheet)

  const [visible, setVisible] = useState(false)

  const handleConfirm = () => {
    setVisible(false)
    onConfirm()
  }

  const handleCancel = () => {
    setVisible(false)
    onCancel()
  }

  const renderDescription = () => {
    return (
      <View style={styles.main}>
        <Text style={styles.description}>{desc}</Text>
      </View>
    )
  }

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={handleCancel} {...rest}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {desc && renderDescription()}
          <View style={styles.footer}>
            <RNUIButton label="ยกเลิก" color="secondary" onPress={handleCancel} />
            <RNUIButton label="ยืนยัน" color="danger" onPress={handleConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundModal,
  },
  modalView: {
    margin: spacings.lg,
    padding: spacings.lg,
    backgroundColor: colors.background,
    borderRadius: spacings.md,

    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...typography.lgB,
  },
  description: {
    ...typography.sm,
    color: colors.gray,
  },
  header: {
    marginBottom: spacings.sm,
  },
  main: {
    marginBottom: spacings.sm,
  },
  footer: {
    flexDirection: 'row',
    gap: spacings.sm,
  },
}))
