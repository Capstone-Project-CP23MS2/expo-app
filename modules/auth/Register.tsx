import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegisterForm from './components/RegisterForm'
import AppButton from '../shared/AppButton'
import RegisterFooter from './components/RegisterFooter'
import { useForm, Controller, UseFormReturn } from 'react-hook-form'
import { NewUserInfo, NewUserInfoSchema } from './newUser.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from 'react-native-paper'
import FormDatetimePicker from './form-date-picker'
import { UseCreateUser } from '@/hooks/useAPI'
import { objToFormData } from '@/utils'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
type Props = {}

export default function Register(props: Props) {
  const router = useRouter()
  const { styles, breakpoint } = useStyles(stylesheet)
  const { email } = useLocalSearchParams<{ email: string }>()
  const { currentUser, onRegister } = useAuth()

  const createUserMutation = UseCreateUser()

  const {
    formState: { isValid, isSubmitting, errors, isDirty },

    control,
    handleSubmit,
    getValues,
    setValue,
    getFieldState,
  } = useForm<NewUserInfo>({
    resolver: zodResolver(NewUserInfoSchema),
    defaultValues: {
      email: email,
      gender: 'Unknown',
      role: 'user',
    },
  })

  const onSubmit = handleSubmit(async newUserData => {
    console.log('🚀 ~ onSubmit ~ newUserData:', newUserData)
    createUserMutation
      .mutateAsync(objToFormData(newUserData), {
        onSuccess: data => {
          onRegister!(data)
        },
        onError: error => {
          console.log(error)
        },
      })
      .then(data => {
        // Do something with the updated data
        console.log(data)
      })
  })

  return (
    // <KeyboardAvoidingWrapper>

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>register</Text>
          <Text style={styles.email}>อีเมล: {email}</Text>
          <View>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextInput
                  label="Username"
                  value={value}
                  placeholder="Enter your username"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, onBlur, value } }) => {
                return <FormDatetimePicker value={value} onChangeDatetime={onChange} />
              }}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <TextInput
                  label="Phone Number"
                  value={value}
                  placeholder="Enter your phone number"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <RegisterFooter
        onCreateAccount={onSubmit}
        isCompleted={isValid && isDirty && !isSubmitting}
      />
    </SafeAreaView>
    // </KeyboardAvoidingWrapper>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    // flex: 1,
    // // justifyContent: 'center',
    // // alignItems: 'center',
    // backgroundColor: theme.colors.background,
    // paddingHorizontal: theme.spacings.page,
    // height: '100%',
    padding: 20,
    paddingBottom: 100,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.typography,
  },
}))
