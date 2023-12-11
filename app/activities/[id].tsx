import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FONT } from '@/constants';
import Colors from '@/constants/Colors';
import useFetch from '@/hooks/useFetch';
import dayjs from 'dayjs';
import { defaultStyles } from '@/constants/Styles';
import { TouchableOpacity, BaseButton } from 'react-native-gesture-handler';
import ActivityFooter from '@/components/ActivityDetails/ActivityFooter';
type Props = {};

const Page = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { data: activity, isLoading, error } = useFetch(`activities/${id}`, {});
  const {
    title,
    description,
    dateTime,
    duration,
    place,
    currentParticipants,
    maxParticipants,
  } = activity;
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>
        {/* <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        /> */}

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.location}>{place}</Text>
          <Text style={styles.rooms}>
            {dayjs(dateTime).format('dddd, MMMM D, YYYY h:mm')}
          </Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <MaterialIcons name="groups" size={20} color="black" />
            <Text style={styles.ratings}>
              {1} / {2} users
            </Text>
          </View>
          <View style={styles.divider} />

          {/* <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View> */}

          {/* <View style={styles.divider} /> */}

          <Text style={styles.description}>{description}</Text>
        </View>
      </Animated.ScrollView>

      {/* <View style={defaultStyles.footer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <BaseButton>
            <MaterialIcons name="favorite-outline" size={36} color="black" />
          </BaseButton>
          <BaseButton
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}>
            <Text style={defaultStyles.btnText}>👋 Join</Text>
          </BaseButton>
        </View>
      </View> */}
      <ActivityFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // image: {
  //   height: IMG_HEIGHT,
  //   width: width,
  // },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: FONT.semiBold,
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: FONT.semiBold,
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: FONT.regular,
  },
  ratings: {
    fontSize: 16,
    fontFamily: FONT.semiBold,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: FONT.semiBold,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: FONT.regular,
  },
});

export default Page;
