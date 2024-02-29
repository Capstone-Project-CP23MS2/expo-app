import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (e) {
        console.error('Failed to load data from AsyncStorage:', e);
      }
    };

    loadData();
  }, [key]);

  const saveValue = async (newValue: any) => {
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      console.error('Failed to save data to AsyncStorage:', e);
    }
  };

  const clearValue = async () => {
    try {
      setValue(defaultValue);
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to clear data from AsyncStorage:', e);
    }
  };

  const getValue = () => value;

  return { getValue, setValue, saveValue, clearValue };
};

export default useAsyncStorage;
