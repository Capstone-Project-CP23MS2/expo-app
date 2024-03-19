import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native'
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import AppTextInput from '@/modules/shared/AppTextInput'

type Props = {
  value: string
  onChangeDatetime: (datetime: Date | undefined) => void
  // isChanged: boolean;
}

const FormDatetimePicker = ({ value, onChangeDatetime }: Props) => {
  const [show, setShow] = useState(false)

  const onChange = (event: any, selectedDate: Date | any) => {
    const currentDate = selectedDate || new Date(value)
    setShow(false)
    onChangeDatetime(currentDate.toISOString().slice(0, -14))
  }

  const showDateTimePicker = () => {
    setShow(true)
  }

  return (
    <>
      <Pressable onPress={showDateTimePicker}>
        {/* <AppTextInput
          value={value?.toLocaleString() || 'Select Date'}
          icon={<MaterialIcons name="calendar-today" size={24} color="gray" />}
          iconName="calendar-today"
          disabled
        /> */}
        <TextInput
          style={{ color: 'gray' }}
          value={value?.toLocaleString() || 'Select Date'}
          placeholder="Enter your phone number"
          editable={false}
        />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </>
  )
}

export default FormDatetimePicker
