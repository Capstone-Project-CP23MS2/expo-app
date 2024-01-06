import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTextInput from '@/components/common/AppTextInput';

type Props = {
  value?: Date | undefined;
  // onChangeDatetime?: (event: any, selectedDate: Date | undefined) => void;
  onChangeDatetime: (datetime: any) => void;
};

const FormDatetimePicker = ({ value, onChangeDatetime }: Props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [changed, setChanged] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setChanged(true);
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
    <View style={{}}>
      {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialIcons
          style={{ marginRight: 10 }}
          name="calendar-today"
          size={24}
          color="black"
        />
        <Text onPress={showDateTimePicker} style={styles.input}>
          {changed ? date.toLocaleString() : 'Select Date and Time'}
        </Text>
      </View> */}
      <Pressable onPress={showDateTimePicker}>
        <AppTextInput
          value={changed ? date.toLocaleString() : 'Select Date and Time'}
          icon={<MaterialIcons name="calendar-today" size={24} color="black" />}
          disabled
        />
      </Pressable>
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
    </View>
  );
};

export default FormDatetimePicker;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 8,
    fontSize: 16,
    flex: 1,
  },
});
