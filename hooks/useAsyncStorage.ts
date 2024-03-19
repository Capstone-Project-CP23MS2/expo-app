import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
type UseAsyncStorageProps = {
  value: any;
  error: any;
  loading: boolean;
  getStorageItem: () => void;
  setStorageItem: (newValue: any) => void;
  clearStorageItem: () => void;
}
const useAsyncStorage = (key: string, defaultValue: any) : UseAsyncStorageProps => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getStorageItem();
  }, []);

  async function getStorageItem() {
    setLoading(true);
    let data
    try {
      data = await AsyncStorage.getItem(key);
      setValue(JSON.parse(data || defaultValue));
    } catch (e) {
      console.error('Failed to get data from AsyncStorage:', e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  const setStorageItem = async (newValue: any) => {
    setLoading(true);
    try {
      setValue(newValue);
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      console.error('Failed to set data from AsyncStorage:', e);
      setError(e);
    }finally {
      setLoading(false);
    }
  }

  const clearStorageItem = async () => {
    setLoading(true);
    try {
      setValue(defaultValue);
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to clear data from AsyncStorage:', e);
      setError(e);
    }finally {
      setLoading(false);
    }
  }

  return {
    value,
    error,
    loading,
    getStorageItem,
    setStorageItem,
    clearStorageItem
  };
};

export default useAsyncStorage;