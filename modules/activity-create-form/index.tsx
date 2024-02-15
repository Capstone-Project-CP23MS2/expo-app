import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { COLORS, FONT, SIZES } from '@/constants'
import DateTimePicker from '@react-native-community/datetimepicker'
import AppTextInput from '@/components/common/AppTextInput'
import { MaterialIcons } from '@expo/vector-icons'
import useFetch from '@/hooks/useFetch'
import axios from 'axios'
// import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router'
import { TextField } from 'react-native-ui-lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createActivity } from '@/api/activities'
import FormDatetimePicker from './components/form-datetime-picker'

import { objToFormData } from '@/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper'
import AppWrapper from '../shared/AppWrapper'
import { UseGetCategories } from '@/api/category'
import { UseGetUsers } from '@/api/users'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActivityInfoSchema, ActivityInfo } from './activity.schema'

import { Colors, Picker } from 'react-native-ui-lib'
import errorMap from 'zod/lib/locales/en'
import { TextInput as TextInputPaper } from 'react-native-paper'
import AppButton from '../shared/AppButton'

type Props = {}
type ActivityData = {
  hostUserId: number
  categoryId: number
  title: string
  description: string
  place: string
  dateTime: any
  duration: number
  noOfMembers: number
  // maxParticipants: number;
}

const CreateActivity = (props: Props) => {
  const router = useRouter()

  const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  const { content: categories } = categoriesData || {}

  const { data: usersData, isLoading: isLoadingUsers } = UseGetUsers()
  const { content: users } = usersData || {}

  const {
    formState: { isValid, isSubmitting, errors, isDirty },
    control,
    handleSubmit,
    getValues,
    setValue,
    getFieldState,
  } = useForm<ActivityInfo>({
    resolver: zodResolver(ActivityInfoSchema),
  })
  // const test: FieldErrors = null
  const handleInputChange = (name: string, value: string) => {
    // formData.set(name, value);
  }
  const queryClient = useQueryClient()
  const { mutateAsync: addActivityMutation } = useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] })
      router.push('/(tabs)/activities')
    },
    onError: error => {
      console.log(error)
    },
  })

  // ฟังก์ชั่นเมื่อกดปุ่ม "เพิ่มกิจกรรม"
  const onSummit = handleSubmit(async activityData => {
    const formData = objToFormData(activityData)
    addActivityMutation(formData)
  })

  const usePreset = () => {
    setValue('categoryId', 1)
    setValue('hostUserId', 1)
    setValue('title', 'test_title-' + Math.random().toString())
    setValue('description', 'test_description')
    setValue('place', 'test_place')
    setValue('dateTime', '2024-03-10T16:20:44.431667Z')
    setValue('duration', 30)
    setValue('noOfMembers', 10)
  }

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView
        // contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                placeholder={'Category'}
                floatingPlaceholder
                value={value}
                enableModalBlur={false}
                onChange={onChange}
                onBlur={onBlur}
                topBarProps={{ title: 'Categories' }}
                showSearch
                searchPlaceholder={'Search a category'}
                searchStyle={{
                  color: Colors.blue30,
                  placeholderTextColor: Colors.grey50,
                }}
              >
                {categories?.map(category => (
                  <Picker.Item
                    key={category.categoryId}
                    value={category.categoryId}
                    label={category.name}
                  />
                ))}
              </Picker>
            )}
          />
          <Controller
            control={control}
            name="hostUserId"
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                placeholder={'Host User (only sprint 1)'}
                floatingPlaceholder
                value={value}
                enableModalBlur={false}
                onChange={onChange}
                onBlur={onBlur}
                topBarProps={{ title: 'Users' }}
                showSearch
                searchPlaceholder={'Search a user'}
                searchStyle={{
                  color: Colors.blue30,
                  placeholderTextColor: Colors.grey50,
                }}
              >
                {users?.map(user => (
                  <Picker.Item key={user.userId} value={user.userId} label={user.username} />
                ))}
              </Picker>
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppTextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={error}
                placeholder="Title"
                showCharCounter
                maxLength={30}
                // icon={<MaterialIcons name="title" size={24} color="black" />}
                iconName="title"
              />
            )}
          />
          {/* <TextInputPaper
            mode="outlined"
            dense
            placeholder="Dense outlined input without label"
            // label="Password"
            // secureTextEntry
            left={<TextInputPaper.Icon icon="eye" />}
          /> */}
          {/* <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                placeholder={'Placeholder'}
                floatingPlaceholder
                onChangeText={onChange}
                value={value}
                enableErrors
                validationMessage={'Field is required'}
                showCharCounter
                maxLength={30}
              />
            )}
          /> */}

          <Controller
            control={control}
            name="place"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppTextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={error}
                placeholder="Place"
                showCharCounter
                maxLength={30}
                icon={<MaterialIcons name="place" size={24} color="black" />}
                iconName="place"
              />
            )}
          />

          <Controller
            control={control}
            name="dateTime"
            render={({ field: { onChange, onBlur, value } }) => {
              // console.log(value);
              // console.log(typeof value);

              return <FormDatetimePicker value={value} onChangeDatetime={onChange} />
            }}
          />
          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppTextInput
                keyboardType="numeric"
                value={value || value === 0 ? value.toString() : ''}
                onBlur={onBlur}
                onChangeText={text => onChange(parseInt(text, 10))}
                error={error}
                placeholder="Duration"
                icon={<MaterialIcons name="schedule" size={24} color="black" />}
                iconName="schedule"
              />
            )}
          />

          <Controller
            control={control}
            name="noOfMembers"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppTextInput
                keyboardType="numeric"
                value={value || value === 0 ? value.toString() : ''}
                onBlur={onBlur}
                onChangeText={text => onChange(parseInt(text, 10))}
                error={error}
                placeholder="Max Participants"
                icon={<MaterialIcons name="people" size={24} color="black" />}
                iconName="people"
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <AppTextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Description"
                error={error}
                showCharCounter
                maxLength={500}
                icon={<MaterialIcons name="note" size={24} color="black" />}
                iconName="note"
              />
            )}
          />

          <View style={{ flex: 1, gap: 6 }}>
            <Button title="Submit" onPress={onSummit} />
            {Boolean(0) && <Button title="Get Value" onPress={() => console.log(getValues())} />}
            {Boolean(0) && (
              <Button
                title="Get Status"
                onPress={() => console.log({ isValid, isSubmitting, isDirty })}
              />
            )}
            {Boolean(1) && <Button title="Get Errors" onPress={() => console.log(errors)} />}
            {Boolean(0) && (
              <Button title="Field Status" onPress={() => console.log(getFieldState('title'))} />
            )}
            {Boolean(1) && (
              <Button
                title="Test"
                onPress={() => {
                  console.log(users)
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton type="secondary" label="preset" onPress={usePreset} />
        <AppButton type="primary" label="preset" onPress={usePreset} fullWidth />
      </View>
    </KeyboardAvoidingWrapper>
  )
}

export default CreateActivity

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    // marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 8,
    fontSize: 16,
    flex: 1,
  },
  addBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
    // // marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
    padding: 12,
  },
  addBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  footer: {
    // height: 60,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderTopColor: Colors.grey,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
})
