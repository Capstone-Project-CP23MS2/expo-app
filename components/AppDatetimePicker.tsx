import { StyleSheet, Text, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTextInput from '@/modules/shared/AppTextInput';

type Props = {
  value: string;
  onChangeDatetime: (datetime: Date | undefined) => void;
  // isChanged: boolean;
  children?: React.ReactNode;
};

const FormDatetimePicker = ({ value, onChangeDatetime, children }: Props) => {
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | any) => {
    const currentDate = selectedDate || new Date(value);
    setShow(false);

    onChangeDatetime(currentDate.toISOString());

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

  return (
    <>
      <Pressable onPress={showDateTimePicker}>
        <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        {/* <AppTextInput
          value={value?.toLocaleString() || 'select your date and time'}
          // icon={<MaterialIcons name="calendar-today" size={24} color="black" />}
          // iconName="calendar-today"
          style={{ color: 'black' }}
          disabled
        /> */}
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ? new Date(value) : new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default FormDatetimePicker;
