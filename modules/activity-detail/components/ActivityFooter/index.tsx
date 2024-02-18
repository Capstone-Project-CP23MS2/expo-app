import { Image, Linking, Pressable, StyleSheet, Text, View, Button } from 'react-native'

import React from 'react'
import { COLORS, FONT, SIZES } from '@/constants'
import { MaterialIcons } from '@expo/vector-icons'
import { BaseButton, TouchableOpacity } from 'react-native-gesture-handler'
import AppButton from '@/modules/shared/AppButton'

type Props = {}

const index = (props: Props) => {
  return (
    <View style={styles.container}>
      {/* <BaseButton style={styles.likeBtn}>
        <Image source={icons.heartOutline} resizeMode="contain" style={styles.likeBtnImage} />
        <MaterialIcons name="favorite-outline" size={36} color="black" />
      </BaseButton> */}

      {/* <TouchableOpacity style={styles.applyBtn} onPress={() => console.log(`Join activity`)}>
        <Text style={styles.applyBtnText}>Join Activity</Text>
      </TouchableOpacity> */}
      <AppButton
        variant="primary"
        label="Join Activity"
        onPress={() => console.log(`Join activity`)}
        fullWidth
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.large,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeBtnImage: {
    width: '40%',
    height: '40%',
  },
  applyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
})
