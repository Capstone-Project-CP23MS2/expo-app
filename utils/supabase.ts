import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://xyzcompany.supabase.co";
console.log("🚀 ~ process.env.EXPO_PUBLIC_SUPABASE_URL:", process.env.EXPO_PUBLIC_SUPABASE_URL)

const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "public";
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  console.log('AppState changed state:', state);
  
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})