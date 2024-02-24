import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import { BaseButton, ScrollView, TextInput } from 'react-native-gesture-handler'
import { COLORS, FONT, SIZES } from '@/constants'
import DateTimePicker from '@react-native-community/datetimepicker'
import AppTextInput from '@/modules/shared/AppTextInput'
import { MaterialIcons } from '@expo/vector-icons'
import useFetch from '@/hooks/useFetch'
import axios from 'axios'
import { Picker } from '@react-native-picker/picker'
import { useRouter } from 'expo-router'
import { TextField } from 'react-native-ui-lib'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FormDatetimePicker from './components/form-datetime-picker-old'
import { objToFormData } from '@/utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper'
import AppWrapper from '../shared/AppWrapper'
import { UseGetCategories, UseGetUsers } from '@/hooks/useAPI'
import Colors from '@/constants/Colors'
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
const apiUrl: string = process.env.EXPO_PUBLIC_BASE_URL_API!
const CreateActivity = (props: Props) => {
  const router = useRouter()

  const [activityData, setActivityData] = useState<ActivityData>({
    hostUserId: 0,
    categoryId: 0,
    title: '',
    description: '',
    place: '',
    dateTime: new Date().toISOString(),
    duration: 0,
    noOfMembers: 0,
    // maxParticipants: 0,
  })
  const [isComplete, setIsComplete] = useState(false)

  const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories()
  const { content: categories } = categoriesData || {}

  const { data: usersData, isLoading: isLoadingUsers } = UseGetUsers()
  const { content: users } = usersData || {}

  useEffect(() => {
    // คำนวณค่าจากข้อมูล
    const newValue =
      activityData.hostUserId &&
      activityData.categoryId &&
      activityData.title &&
      activityData.place &&
      activityData.dateTime &&
      activityData.duration &&
      activityData.noOfMembers
        ? 1
        : 0

    // อัปเดต state สำหรับค่าที่คำนวณ
    setIsComplete(Boolean(newValue))
  }, [activityData])

  const handleInputChange = (name: string, value: string) => {
    // formData.set(name, value);
  }
  const queryClient = useQueryClient()

  // ฟังก์ชั่นเมื่อกดปุ่ม "เพิ่มกิจกรรม"
  const onSummit = async () => {
    setActivityData({
      ...activityData,
      // hostUserId: selectedUser.userId,
      // categoryId: selectedCategory.categoryId,
      hostUserId: 1,
      categoryId: 1,
    })
    console.log(activityData)

    // const formData = objToFormData(activityData);
    // addActivityMutation(formData);
  }

  const usePreset = () => {
    setActivityData({
      ...activityData,
      // hostUserId: 3,
      // categoryId: 3,
      title: 'test_title' + Math.random().toString(),
      description: 'test_description',
      place: 'test_place',
      dateTime: '2024-03-10T16:20:44.431667Z',
      duration: 30,
      noOfMembers: 10,
    })
  }

  const [selectedCategory, setSelectedCategory] = useState<any>(0)
  const [selectedUser, setSelectedUser] = useState<any>(0)
  const selectCategory = (category: any) => {
    setSelectedCategory(category)
    setActivityData({ ...activityData, categoryId: category.categoryId })
  }

  const selectUser = (user: any) => {
    setSelectedUser(user)
    setActivityData({ ...activityData, hostUserId: user.userId })
  }

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text>Category</Text>
          <Text>{isComplete}</Text>
          <Picker selectedValue={selectedCategory} onValueChange={selectCategory}>
            {categories?.map((item, index) => (
              <Picker.Item key={index} value={item} label={item.name} />
            ))}
          </Picker>
          <Text>Host User</Text>
          <Picker selectedValue={selectedUser} onValueChange={selectUser}>
            {users?.map((item, index) => (
              <Picker.Item key={index} value={item} label={item.username} />
            ))}
          </Picker>

          <AppTextInput
            value={activityData.title}
            onChangeText={text => setActivityData({ ...activityData, title: text })}
            placeholder="Title"
            icon={<MaterialIcons name="title" size={24} color="black" />}
          />

          <AppTextInput
            value={activityData.place}
            onChangeText={text => setActivityData({ ...activityData, place: text })}
            placeholder="Place"
            icon={<MaterialIcons name="place" size={24} color="black" />}
          />
          <Text>{activityData.dateTime}</Text>
          <FormDatetimePicker
            onChangeDatetime={datetime => setActivityData({ ...activityData, dateTime: datetime })}
          />

          <AppTextInput
            keyboardType="numeric"
            value={activityData.duration.toString()}
            onChangeText={text =>
              setActivityData({ ...activityData, duration: parseInt(text, 10) })
            }
            placeholder="Duration"
            icon={<MaterialIcons name="schedule" size={24} color="black" />}
          />

          <AppTextInput
            keyboardType="numeric"
            value={activityData.noOfMembers.toString()}
            onChangeText={text =>
              setActivityData({
                ...activityData,
                noOfMembers: parseInt(text, 10) | 2,
              })
            }
            placeholder="Max Participants"
            icon={<MaterialIcons name="people" size={24} color="black" />}
          />
          {/* note */}

          <AppTextInput
            value={activityData.description}
            onChangeText={text => setActivityData({ ...activityData, description: text })}
            placeholder="Note"
            icon={<MaterialIcons name="note" size={24} color="black" />}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <BaseButton
          onPress={usePreset}
          style={[
            {
              backgroundColor: COLORS.tertiary,

              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.medium,
              padding: 12,
            },
          ]}
        >
          <Text style={styles.addBtnText}>preset</Text>
        </BaseButton>
        <BaseButton
          style={[styles.addBtn, isComplete ? {} : { backgroundColor: 'gray' }]}
          onPress={onSummit}
          enabled={isComplete}
        >
          <Text style={styles.addBtnText}>Add</Text>
        </BaseButton>
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
