import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/auth_old'

export default function protectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {}, [])
  return children
}
