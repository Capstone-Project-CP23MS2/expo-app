import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItemStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log('Error storing data', error);
    
  }
}
export const getItemStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value
    }
  } catch (error) {
    console.log('Error getting data', error);
  }
}