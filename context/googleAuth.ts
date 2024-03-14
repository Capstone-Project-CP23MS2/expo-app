import {
  GoogleSignin,
  statusCodes,
  User as GoogleUserInfo,
} from '@react-native-google-signin/google-signin'

export const configureGoogleSignIn = async () => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });
  console.log('📐 ~ configureGoogleSignIn');
};

export const googleSignIn = async () => {
  try {
    console.log('🔍 signIn');

    await GoogleSignin.hasPlayServices();
    const userInfo: GoogleUserInfo = await GoogleSignin.signIn();
    const { idToken, user } = userInfo;
    return userInfo;
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

export const googleSignInSilently = async () => {
  try {
    console.log('🔍 signInSilently');

    const userInfo: GoogleUserInfo = await GoogleSignin.signInSilently();
    return userInfo;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      // user has not signed in yet
      console.log('🚨 ~ googleSignInSilently ~ user has not signed in yet');
    } else {
      console.log('🚨 ~ googleSignInSilently ~ some other error');
    }
  }
};