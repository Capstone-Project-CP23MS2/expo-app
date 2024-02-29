import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoaderScreen, Text, TextField } from 'react-native-ui-lib'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewUserInfoSchema, NewUserInfo } from '@/modules/auth/newUser.schema'
import { objToFormData } from '@/utils'
import AppButton from '@/modules/shared/AppButton'
import { ScrollView } from 'react-native-gesture-handler'
import FormDatetimePicker from '@/modules/auth/form-date-picker'
import { UseCreateUser, UseGetUserByEmail } from '@/hooks/useAPI'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
// import { useAuth } from '@/context/auth'

type Props = {}

const createUser = (props: Props) => {
  const { currentUser, setUser } = useAuth()
  const { email } = useLocalSearchParams()

  const router = useRouter()

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
  })

  //TODO: เปลี่ยนวิธี set ข้อมูล
  const onSummit = handleSubmit(async newUserData => {
    createUserMutation
      .mutateAsync(objToFormData(newUserData), {
        onSuccess: data => {
          console.log(data)

          router.push('/(app)/(tabs)/activities')
        },
        onError: error => {
          console.log(error)
        },
      })
      .then(data => {
        // Do something with the updated data
        console.log(data)
      })
    // register(formData)
    try {
      const { data, isLoading, isError, isSuccess } = UseGetUserByEmail(email)
      setUser({
        userId: data?.content[0].userId,
        userName: data?.content[0].username,
        email: data?.content[0].email,
        ...currentUser,
      })
    } catch (e) {
      console.log(e)
    }
  })
  const { data, isLoading, isError, isSuccess } = UseGetUserByEmail(email)

  useEffect(() => {
    setValue('email', email)
    setValue('gender', 'Unknown')
    setValue('role', 'user')
  }, [])

  if (isLoading) {
    return <LoaderScreen />
  }
  if (isSuccess) {
    setUser({
      ...currentUser,
      userId: data?.content[0].userId,
      userName: data?.content[0].username,
      email: data?.content[0].email,
    })

    return <Redirect href="/(app)/(tabs)/activities" />
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>{data?.content[0].email}</Text>
          <Text h3>Create User</Text>
          <Text sm>ชื่อผู้ใช้</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextField
                placeholder="Username"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          <Text sm>วันเกิด</Text>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, onBlur, value } }) => {
              return <FormDatetimePicker value={value} onChangeDatetime={onChange} />
            }}
          />
          <Text sm>เบอร์โทรศัพท์</Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextField
                placeholder="Phone Number"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton variant="primary" label="Add" onPress={() => onSummit()} fullWidth />
      </View>
    </SafeAreaView>
  )
}

export default createUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,

    flexDirection: 'row',
    gap: 10,
  },
})
