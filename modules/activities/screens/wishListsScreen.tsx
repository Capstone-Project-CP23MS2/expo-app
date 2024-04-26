import { View, Text } from 'react-native';
// import { View, Text, Image, Assets, Button } from 'react-native-ui-lib';

import React, { useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TabController, TabControllerItemProps } from 'react-native-ui-lib';
import ActivityOwnTab from '../components/whshLists/ActivityOwnTab';
import ActivityPastTab from '../components/whshLists/ActivityPastTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';

type Props = {};

const WishListsScreen = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const [key, setKey] = useState<string | number>(0);

  const items: TabControllerItemProps[] = [
    {
      // key: 'my-events',
      label: '😀 เข้าร่วม', //เป็นเจ้าของ
    },
    // {
    //   // key: 'joined',
    //   label: 'เข้าร่วม',
    // },
    {
      // key: 'favorite',
      label: '📌 บันทึกแล้ว',
      // badge: { label: '2', style: { marginLeft: 4 }, size: 24 },
    },
    {
      // key: 'favorite',
      label: '📦 ผ่านไปแล้ว',
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const onChangeIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
  };

  const renderTabPages = () => {
    return (
      <TabController.PageCarousel style={{}}>
        <TabController.TabPage index={0}>
          <ActivityOwnTab />
        </TabController.TabPage>
        <TabController.TabPage index={1} lazy>
          <View style={{ flex: 1 }}>
            <Text>2</Text>
          </View>
        </TabController.TabPage>
        <TabController.TabPage index={2} lazy>
          <View style={{ flex: 1 }}>
            <ActivityPastTab />
          </View>
        </TabController.TabPage>
      </TabController.PageCarousel>
    );
  };

  const fewItems = true;
  return (
    <>
      <Tabs.Screen
        options={{
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <TabController
          key={key}
          items={items}
          initialIndex={0}
          asCarousel={true}
          // onChangeIndex={onChangeIndex}
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
}));

export default WishListsScreen;
