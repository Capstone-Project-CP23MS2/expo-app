import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Card, Colors, Picker } from 'react-native-ui-lib'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateActivityInfo, UpdateActivityInfoSchema } from './updateActivity.schema'
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper'
import { ScrollView } from 'react-native-gesture-handler'
import AppTextInput from '../shared/AppTextInputOld'
import FormDatetimePicker from '../activity-create-form/components/form-datetime-picker'
import AppButton from '../shared/AppButton'
import { UseGetActivity, UseGetCategories, UseUpdateActivity } from '@/hooks/useAPI'
import { filterChangedFormFields, objToFormData } from '@/utils'
import { ActivityUpdateRequest } from '@/api/type'
import { d } from '@tanstack/react-query-devtools/build/legacy/devtools-dKCOqp9Q'
import { useAuth } from '@/context/authContext'

export default function ActivityEditScreen() {
  const { styles, breakpoint } = useStyles(stylesheet)
  const router = useRouter()
  const { activityId } = useLocalSearchParams<{ activityId: string }>()
  const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  const { content: categories } = categoriesData || {}

  const { user } = useAuth()

  const { data: activity } = UseGetActivity(activityId)

  const updateActivityMutation = UseUpdateActivity()

  const {
    formState: { isValid, isSubmitting, errors, isDirty, dirtyFields },
    control,
    handleSubmit,
    getValues,
    setValue,
    getFieldState,
  } = useForm<UpdateActivityInfo>({
    resolver: zodResolver(UpdateActivityInfoSchema),
    defaultValues: {
      title: activity?.title,
      dateTime: activity?.dateTime,
      duration: activity?.duration,
      noOfMembers: activity?.noOfMembers,
      description: activity?.description,
      categoryId: activity?.categoryId,
      locationId: activity?.location?.locationId,
    },
  })

  const onSummit = handleSubmit(async updateData => {
    const filterChangedActivity = filterChangedFormFields(updateData, dirtyFields)
    updateActivityMutation.mutate(
      { activityId: Number(activityId), updateRequest: filterChangedActivity },
      {
        onSuccess: () => {
          console.log('onSuccess in UpdateActivityPage')
          router.back()
        },
        onError: error => {
          console.log('error')
          console.log(error)
        },
      },
    )
  })

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text>Activity Title</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <AppTextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={error}
                  placeholder="eg. KMUTT Basketball"
                />
              )}
            />
          </View>
          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text>Category</Text>
            <View style={styles.textinput}>
              <Controller
                control={control}
                name="categoryId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Picker
                    placeholder={'select your category'}
                    value={value}
                    enableModalBlur={false}
                    onChange={onChange}
                    onBlur={onBlur}
                    topBarProps={{ title: 'Categories' }}
                    searchPlaceholder={'Search a category'}
                    searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.grey50 }}
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
            </View>
          </View>

          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text>Date Time</Text>
            <Controller
              control={control}
              name="dateTime"
              render={({ field: { onChange, onBlur, value } }) => {
                return <FormDatetimePicker value={value} onChangeDatetime={onChange} />
              }}
            />
          </View>
          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text>Duration (Minutes)</Text>
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
                  placeholder="eg. 20"
                />
              )}
            />
          </View>
          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text>Total Member</Text>
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
                  placeholder="eg. 2"
                  iconName="people"
                />
              )}
            />
          </View>
          <View style={{ gap: 5, marginBottom: 10 }}>
            <Text>Description</Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <AppTextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="eg. anyone can join our activity !"
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <AppButton
          variant="primary"
          label="Save"
          enabled={isDirty}
          onPress={() => onSummit()}
          fullWidth
        />
      </View>
    </KeyboardAvoidingWrapper>
  )
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    padding: theme.spacings.md,
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
}))
