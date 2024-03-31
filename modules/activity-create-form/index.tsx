import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, FONT, SIZES } from '@/constants'
import AppTextInput from '@/modules/shared/AppTextInput'
import { MaterialIcons } from '@expo/vector-icons'

import { useRouter } from 'expo-router'
import { UseCreateActivity, UseGetCategories, UseGetUsers } from '@/hooks/useAPI'
import FormDatetimePicker from './components/form-datetime-picker'

import { objToFormData } from '@/utils'
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActivityInfoSchema, ActivityInfo } from './activity.schema'

import { Colors, Picker } from 'react-native-ui-lib'
import AppButton from '../shared/AppButton'
import { useAuth } from '@/context/authContext'

const dropdownIcon = <MaterialIcons name="arrow-drop-down" size={30} color="black" />

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
  const { user } = useAuth()
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
    defaultValues: {
      hostUserId: user?.userId,
      locationId: 1,
    },
  })
  // const test: FieldErrors = null
  const handleInputChange = (name: string, value: string) => {
    // formData.set(name, value);
  }
  const createMutation = UseCreateActivity()

  // ฟังก์ชั่นเมื่อกดปุ่ม "เพิ่มกิจกรรม"
  const onSummit = handleSubmit(async activityData => {
    createMutation.mutate(objToFormData(activityData), {
      onSuccess: () => {
        console.log('onSuccess in CreateActivityPage')
        ToastAndroid.show('New activity created', ToastAndroid.SHORT)
        router.push('/(app)/(tabs)/')
      },
      onError: error => {
        console.log('error')
        console.log(error)
      },
    })
  })

  const usePreset = () => {
    setValue('categoryId', 1)
    setValue('title', 'test_title-' + Math.random().toString())
    setValue('description', 'test_description')
    setValue('dateTime', '2024-03-10T16:20:44.431667Z')
    setValue('duration', 30)
    setValue('noOfMembers', 10)
  }

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
                    trailingAccessory={dropdownIcon}
                    showSearch={true}
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
        {/* <AppButton variant="primary" label="Preset" onPress={usePreset} /> */}
        <AppButton variant="secondary" label="🔮 preset (test)" onPress={usePreset} />
        <AppButton variant="primary" label="Create Activity" onPress={() => onSummit()} fullWidth />
      </View>
    </KeyboardAvoidingWrapper>
  )
}

export default CreateActivity

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
  },
  textinput: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    paddingLeft: 15,
  },
})
