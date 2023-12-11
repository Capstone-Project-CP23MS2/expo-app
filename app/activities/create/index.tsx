import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import {
  BaseButton,
  ScrollView,
  TextInput,
} from 'react-native-gesture-handler';
import { COLORS, FONT, SIZES } from '@/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTextInput from '@/components/common/AppTextInput';
import { MaterialIcons } from '@expo/vector-icons';
import useFetch from '@/hooks/useFetch';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { TextField } from 'react-native-ui-lib';

type Props = {};
type ActivityData = {
  hostUserId: number;
  categoryId: number;
  title: string;
  description: string;
  place: string;
  dateTime: any;
  duration: number;
  noOfMembers: number;
  // maxParticipants: number;
};
const apiUrl: string = process.env.EXPO_PUBLIC_BASE_URL_API!;
const CreateActivity = (props: Props) => {
  const router = useRouter();

  const [activityData, setActivityData] = useState<ActivityData>({
    hostUserId: 0,
    categoryId: 0,
    title: '',
    description: '',
    place: '',
    dateTime: '',
    duration: 0,
    noOfMembers: 0,
    // maxParticipants: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

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
        : 0;

    // อัปเดต state สำหรับค่าที่คำนวณ
    setIsComplete(Boolean(newValue));
  }, [activityData]);

  const [categories, setCategories] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    // Function to fetch activities from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/categories`);
        setCategories(response.data.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        // setLoading(false);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.content);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        // setLoading(false);
      }
    };
    // Call the fetchActivities function
    fetchCategories();

    fetchUsers();
  }, []);

  // console.log(categories);

  const handleInputChange = (name: string, value: string) => {
    // formData.set(name, value);
  };

  // ฟังก์ชั่นเมื่อกดปุ่ม "เพิ่มกิจกรรม"
  const handleAddActivity = async () => {
    setActivityData({
      ...activityData,
      hostUserId: selectedUser.userId,
      categoryId: selectedCategory.categoryId,
    });

    // console.log(activityData);

    const formData = new FormData();

    for (const [key, value] of Object.entries(activityData)) {
      const stringValue = typeof value === 'number' ? value.toString() : value;
      formData.append(key, stringValue);
    }
    // console.log([...formData.entries()]);
    console.log(formData);

    try {
      const response = await axios.post(`${apiUrl}/activities`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Success:', response.data);
        router.push('/(tabs)/');
        // setUser(response.data.data);
        // setIsLoading(false);
      }
      console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
    });
  };

  const [date, setDate] = useState<any>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    setActivityData({
      ...activityData,
      dateTime: currentDate.toISOString(),
    });
    // show time picker when date is selected
    if (mode === 'date' && event.type === 'set') {
      showMode('time');
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setMode(currentMode);
    setShow(true);
  };

  const showDateTimePicker = () => {
    showMode('date');
  };
  const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);
  const [selectedUser, setSelectedUser] = useState<any>(users[0]);
  const selectCategory = (category: any) => {
    setSelectedCategory(category);
    setActivityData({ ...activityData, categoryId: category.categoryId });
  };

  const selectUser = (user: any) => {
    setSelectedUser(user);
    setActivityData({ ...activityData, hostUserId: user.userId });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text>Category</Text>
        <Text>{isComplete}</Text>
        <Picker selectedValue={selectedCategory} onValueChange={selectCategory}>
          {categories.map((item, index) => (
            <Picker.Item key={index} value={item} label={item.name} />
          ))}
        </Picker>
        <Text>Host User</Text>
        <Picker selectedValue={selectedUser} onValueChange={selectUser}>
          {users.map((item, index) => (
            <Picker.Item key={index} value={item} label={item.username} />
          ))}
        </Picker>

        <AppTextInput
          value={activityData.title}
          onChangeText={text =>
            setActivityData({ ...activityData, title: text })
          }
          placeholder="Title"
          icon={<MaterialIcons name="title" size={24} color="black" />}
        />

        <AppTextInput
          value={activityData.place}
          onChangeText={text =>
            setActivityData({ ...activityData, place: text })
          }
          placeholder="Place"
          icon={<MaterialIcons name="place" size={24} color="black" />}
        />

        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons
              style={{ marginRight: 10 }}
              name="calendar-today"
              size={24}
              color="black"
            />
            <Text onPress={showDateTimePicker} style={styles.input}>
              {activityData.dateTime || 'Select Date and Time'}
            </Text>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

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
          onChangeText={text =>
            setActivityData({ ...activityData, description: text })
          }
          placeholder="Note"
          icon={<MaterialIcons name="note" size={24} color="black" />}
        />

        <BaseButton onPress={usePreset}>
          <Text>Use Preset</Text>
        </BaseButton>
      </ScrollView>
      <View style={styles.btnContainer}>
        <BaseButton
          style={[styles.addBtn, isComplete ? {} : { backgroundColor: 'gray' }]}
          onPress={handleAddActivity}
          enabled={isComplete}>
          <Text style={styles.addBtnText}>Add</Text>
        </BaseButton>
      </View>
    </>
  );
};

export default CreateActivity;

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
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: SIZES.medium,
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
});
