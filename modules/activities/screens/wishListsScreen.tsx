import { View, Text } from 'react-native';
// import { View, Text, Image, Assets, Button } from 'react-native-ui-lib';

import React, { useEffect, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TabController, TabControllerItemProps } from 'react-native-ui-lib';
import ActivityUpcomingTab from '../components/whshLists/ActivityUpcomingTab';
import ActivityPastTab from '../components/whshLists/ActivityPastTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import { UseGetActivities, UseGetMyUserInfo } from '@/hooks/useAPI';
import { FlashList } from '@shopify/flash-list';
import { ActivityCard } from '../components';
import { ActivityIndicator } from 'react-native-paper';

type Props = {};

const items: TabControllerItemProps[] = [
  {
    label: 'กำลังมาถึง', //เป็นเจ้าของ
  },
  {
    label: 'จบไปแล้ว',
    // badge: { label: '2', style: { marginLeft: 4 }, size: 24 },
  },
  {
    // key: 'favorite',
    label: 'ยกเลิก/ไม่ได้ไป',
  },
];

const WishListsScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const [key, setKey] = useState<string | number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    switch (selectedIndex) {
      case 0:
      default:
        console.log(1);
        // setDateStatus('upcoming');
        break;
      case 1:
        console.log(2);

        // setDateStatus('past');
        break;
      case 2:
        console.log(3);
        // setDateStatus('cancel');
        break;
    }
  }, [selectedIndex]);

  const renderTabPages = () => {
    return (
      <TabController.PageCarousel style={{}}>
        <TabController.TabPage index={0}>
          <ActivityUpcomingTab />
        </TabController.TabPage>
        <TabController.TabPage index={1} lazy>
          <ActivityPastTab />
        </TabController.TabPage>
        <TabController.TabPage index={2} lazy>
          <View style={{ flex: 1 }}></View>
        </TabController.TabPage>
      </TabController.PageCarousel>
    );
  };

  const fewItems = true;
  return (
    <>
      <Tabs.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: 'กิจกรรมของฉัน',
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
      <View style={styles.container}>
        <TabController
          key={key}
          items={items}
          initialIndex={0}
          asCarousel={true}
          onChangeIndex={setSelectedIndex}
        >
          <TabController.TabBar
            key={key}
            labelStyle={styles.tabBarLabel}
            selectedLabelStyle={[styles.tabBarLabel, styles.tabBarLabelActive]}
            spreadItems={false}
            enableShadow
            activeBackgroundColor={'#f0f0f0'}
            //  // uppercase
            //   // indicatorStyle={{backgroundColor: 'green', height: 3}}
            //   // indicatorInsets={0}

            //   // labelColor={'green'}
            //   // selectedLabelColor={'red'}
            //   // iconColor={'green'}
            //   // selectedIconColor={'blue'}
          />
          {renderTabPages()}
        </TabController>
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabBarLabel: {
    ...typography.md,
  },
  tabBarLabelActive: {
    color: colors.primary,
  },
  headerTitleStyle: {
    ...typography.h5,
  },
}));

export default WishListsScreen;
