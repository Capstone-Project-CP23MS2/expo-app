import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Stack, Link, useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import AppButton from '@/modules/shared/AppButton';
import { RNUIButton } from '@/components';

type Props = {};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
    />
  );
}

export default function Page(props: Props) {
  const router = useRouter();
  const navigation = useNavigation();
  const { styles, breakpoint } = useStyles(stylesheet);

  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Unistyles </Text>
          <AppButton
            label="Toggle Theme"
            variant="primary"
            onPress={() =>
              UnistylesRuntime.setTheme(UnistylesRuntime.themeName === 'light' ? 'dark' : 'light')
            }
          />
          <RNUIButton
            label="Toggle Theme"
            color="secondary"
            onPress={() =>
              UnistylesRuntime.setTheme(UnistylesRuntime.themeName === 'light' ? 'dark' : 'light')
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
}));
