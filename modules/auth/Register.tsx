import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppButton from '../shared/AppButton'
import RegisterFooter from './components/RegisterFooter'
import { useForm, Controller, UseFormReturn } from 'react-hook-form'
import { NewUserInfo, NewUserInfoSchema } from './newUser.schema'
import { zodResolver } from '@hookform/resolvers/zod'
// import { TextInput } from 'react-native-paper'
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
  const { user, onRegister, onLogout, onLogin } = useAuth()

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
      locationId: '1',
    },
  })

  const onSubmit = handleSubmit(async newUserData => {
    console.log('🚀 ~ onSubmit ~ newUserData:', newUserData)
    createUserMutation
      .mutateAsync(objToFormData(newUserData), {
        onSuccess: async user => {
          onRegister!(user)
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

    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Connect with your friend today !</Text>
          {/* <Text style={styles.email}>{email}</Text> */}
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <View>
            <View style={{ gap: 5, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Username</Text>
              <View style={styles.textInput}>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                      value={value}
                      placeholder="Enter your username"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
            </View>
            <View style={{ gap: 5, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Date Of Birth</Text>
              <View style={styles.textInput}>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field: { onChange, onBlur, value } }) => {
                    return <FormDatetimePicker value={value} onChangeDatetime={onChange} />
                  }}
                />
              </View>
            </View>
            <View style={{ gap: 5, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>Mobile Number</Text>
              <View style={styles.textInput}>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                      value={value}
                      placeholder="Enter your phone number"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          {/* <AppButton label="submit" onPress={() => console.log(getValues())} /> */}
        </View>
      </ScrollView>
      <RegisterFooter
        onCreateAccount={onSubmit}
        isCompleted={isValid && isDirty && !isSubmitting}
      />
    </SafeAreaView>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 0,
    padding: 20,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
  title: {
    ...theme.typography.h4,
    color: theme.colors.typography,
    fontWeight: 'bold',
  },
  subtitle: {
    ...theme.typography.sm,
    color: theme.colors.typography,
  },
  textInput: {
    width: '100%',
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 15,
  },
}))
