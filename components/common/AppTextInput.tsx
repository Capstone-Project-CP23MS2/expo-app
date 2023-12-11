import { StyleSheet, Text, View, TextInput } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';
import { ReactNode } from 'react';

type Props = {
  value: string;
  keyboardType?: TextInput.KeyboardType;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  label?: string;
  error?: string;
};

const AppTextInput = ({
  value,
  keyboardType,
  onChangeText,
  placeholder,
  icon,
  label,
  error,
}: Props) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <TextInput
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          // style={{borderColor: error ? 'red' : 'black',}}
        />
      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 8,
    fontSize: 16,
    flex: 1,
  },
});

export default AppTextInput;
