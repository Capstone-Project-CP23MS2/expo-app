import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUserInfo,
} from '@react-native-google-signin/google-signin';
import { UserResponse, UserUpdateRequest } from '@/api/type';
import { useRouter, useSegments } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usersApi from '@/api/users';
import { AxiosError, isAxiosError } from 'axios';
import { UseGetUserByEmail, UseUpdateMyUserInfo } from '@/hooks/useAPI';
import { set } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

const TOKEN_KEY = 'my-jwt';

interface AuthProps {
  user?: UserResponse | null;
  session?: {
    idToken: string | null | undefined;
    authenticated: boolean | null;
  };
  onRegister?: (newUser: UserResponse) => void;
  onLogin?: (args?: { redirectToRegister?: boolean }) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoading?: boolean;
  onSyncUserInfo?: (userInfo: UserResponse) => void;
  onByPassGoogleLogin?: () => any;
  // test?: (props: any) => any
}

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<{
    idToken: string | null | undefined;
    authenticated: boolean | null;
  }>({ idToken: null, authenticated: null });
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const rootSegment = useSegments()[0];
  const queryClient = useQueryClient();

  useEffect(() => {
    const init = async () => {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
      if (!isSignedInWithGoogle) return setIsLoading(false);

      console.log(`😀 You are already logged in with Google.`);

      const { email, idToken }: any = await googleAuthentication();
      if (email === undefined || !email) return logout();

      setSession({
        authenticated: true,
        idToken: idToken,
      });
      setIsLoading(true);
      await SecureStore.setItemAsync(TOKEN_KEY, idToken!);

      loginMutation.mutate(undefined, {
        onSettled: async () => {
          setIsLoading(false);
        },
      });
    };
    configureGoogleSignIn();

    init();
  }, []);

  const register = async (newUser: UserResponse) => {
    setUser(newUser);
    router.replace('/(app)/profile/onboarding/interests');
  };
  const syncUserInfo = (userInfo: UserResponse) => {
    setUser(userInfo);
  };

  const loginMutation = useMutation({
    mutationFn: usersApi.getMyUserInfo,
    onSuccess: async user => {
      await queryClient.invalidateQueries({ queryKey: ['user-info'] });
      setUser(user);
      router.replace('/(app)/(tabs)/');
    },
  });

  const login = async ({ redirectToRegister = true } = {}) => {
    try {
      const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
      if (isSignedInWithGoogle) await logout();

      const { email, idToken }: any = await googleAuthentication();
      setSession({
        authenticated: true,
        idToken: idToken,
      });

      setIsLoading(true);
      await SecureStore.setItemAsync(TOKEN_KEY, idToken!);

      loginMutation.mutate(undefined, {
        onError: async (error: Error | AxiosError) => {
          if (!isAxiosError(error)) return;
          if (error.response?.status === 404) {
            router.push({
              pathname: '/(auth)/register',
              params: { email },
            });
          }
        },
        onSettled: async () => {
          setIsLoading(false);
        },
      });
    } catch (error: any) {
      ToastAndroid.show('เกิดข้อผิดพลาดบางอย่างที่เซิฟเวอร์', ToastAndroid.SHORT);
      logout();
    }
  };

  const logout = async () => {
    setIsLoading(true);
    console.log('🔓 Logout');

    setSession({
      idToken: null,
      authenticated: false,
    });
    setUser(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    queryClient.removeQueries({ queryKey: ['user-info'] });

    setIsLoading(false);
  };
  const { data } = UseGetUserByEmail('chickenforregis1@gmail.com');
  const byPassGoogleLogin = async () => {
    const testEmail = 'chickenforregis1@gmail.com';
    const testToken =
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkZjVlNzEwZWRmZWJlY2JlZmE5YTYxNDk1NjU0ZDAzYzBiOGVkZjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA1MzY1NTk0NjI0MC1xYmd0NmFnY3JnMDJzZmxtZ2V2aG9laHM3aGFyZnJwaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwNTM2NTU5NDYyNDAtcWJndDZhZ2NyZzAyc2ZsbWdldmhvZWhzN2hhcmZycGkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUxMjYwMDQzOTYwMzU3NjAzNTQiLCJlbWFpbCI6ImNoaWNrZW5mb3JyZWdpczFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJyWTVMeXhNNUZKOGFnMlgxME5tVG1BIiwiaWF0IjoxNzExMzg5OTcwLCJleHAiOjE3MTEzOTM1NzB9.Pgx3BgDngjRrYdJGOPfG9OjHitgPovmdPnlSMZ4_lukYWeG-_P4Oak7ZAtw2XiCXnpOQjmOX5oXj6i1t3TRZEYJ_UcOW5AeQ5hSabLAbs6I5QAdLufcpKyOzYBY43EinuK1E4SlGw4NxDcUY2vw02lGweGrFIEwEI3UrHdWbfKpYotr-29fz0udkMr-jRug5AFSO_B9vRAzTaTngZZZyrLTneTD3-VKynBg7F__SEy37WyknDq_JGs74MsULc1gRTnvnrf6FQNnXGRFbRbZtl3F46SOtKbzh579QUmNVTpnTqSNRvqb7w48-u39AvQ4s4lqDnzVRCwap8jPpgyy6pQ';
    setSession({
      authenticated: true,
      idToken: testToken,
    });

    setIsLoading(true);
    await SecureStore.setItemAsync(TOKEN_KEY, testToken!);

    loginMutation.mutate(undefined, {
      onError: async (error: Error | AxiosError) => {
        if (!isAxiosError(error)) return;
        if (error.response?.status === 404) {
          router.push({
            pathname: '/(auth)/register',
            params: { testEmail },
          });
        }
      },
      onSettled: async () => {
        setIsLoading(false);
      },
    });
  };

  const value = {
    user,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onSyncUserInfo: syncUserInfo,
    session,
    isLoading: isLoading,
    onByPassGoogleLogin: byPassGoogleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const configureGoogleSignIn = async () => {
  GoogleSignin.configure({
    scopes: ['email'],
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });
};

const googleAuthentication = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
    let signInFuction = isSignedInWithGoogle ? GoogleSignin.signInSilently : GoogleSignin.signIn;

    const {
      idToken,
      user: { email },
    }: GoogleUserInfo = await signInFuction();

    await SecureStore.setItemAsync(TOKEN_KEY, idToken!);
    console.log('🔐 Authentication with Google success:', email);

    return { email, idToken };
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('🚨 ~ googleSignIn ~ user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('🚨 ~ googleSignIn ~ operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('🚨 ~ googleSignIn ~ play services not available or outdated');
    } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log(
        '🚨 ~ googleSignIn ~ Useful for use with signInSilently() - no user has signed in yet',
      );
    } else {
      // some other error happened
      console.log('🚨 ~ googleSignIn ~ some other error happened');
    }
  }
};

// const updateUserInfoMutation = UseUpdateMyUserInfo()

// const updateUser = async (updateData: UserUpdateRequest) => {
//   updateUserInfoMutation.mutate(
//     { userId: user?.userId!, updateRequest: updateData },
//     {
//       onSuccess: data => {
//         setUser(data)
//         console.log('onSuccess in UpdateProfilePage')
//         router.back()
//       },
//       onError: error => {
//         console.log('error')
//         console.log(error)
//       },
//     },
//   )
// }
