import { View, Text, Modal, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Modal as RNUIModal } from 'react-native-ui-lib'
import { AppModal, RNUIButton } from '@/components'

type Props = {}

export default function DevModalView(props: Props) {
  const { styles } = useStyles(stylesheet)
  const [modalVisible, setModalVisible] = useState(false)
  const [RNUIModalVisible, setRNUIModalVisible] = useState(false)
  const [RNUIModalTopbarVisible, setRNUIModalTopbarVisible] = useState(false)
  const [appModalVisible, setAppModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <Text>DevModalView</Text>
      <RNUIButton label="RNUIButton" onPress={() => setAppModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>

      <RNUIModal
        animationType="slide"
        visible={RNUIModalVisible}
        onBackgroundPress={() => console.log('background pressed')}
      >
        <Text>Hello World!</Text>
      </RNUIModal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setRNUIModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show RNUIModal 1</Text>
      </Pressable>

      <RNUIModal.TopBar
        title="modal title"
        onCancel={() => setRNUIModalTopbarVisible(false)}
        onDone={() => Alert.alert('done')}
        doneButtonProps={{
          disabled: true,
        }}
      />

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setRNUIModalTopbarVisible(true)}
      >
        <Text style={styles.textStyle}>Show RNUIModal 2</Text>
      </Pressable>

      <AppModal isOpen={appModalVisible} />
    </View>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
}))
