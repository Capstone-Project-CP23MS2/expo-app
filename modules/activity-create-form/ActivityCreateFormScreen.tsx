import { View, Text, ToastAndroid } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { UseCreateActivity, UseGetCategories, UseGetMyUserInfo } from '@/hooks/useAPI';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityInfo, ActivityInfoSchema } from './activity.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView } from 'react-native-gesture-handler';
import {
  AppDatetimePicker,
  KeyboardAvoidingWrapper,
  RNUIButton,
  RNUITextField,
} from '@/components';
import { NumberInput, Picker, TouchableOpacity } from 'react-native-ui-lib';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { UseGetPlaces } from '@/hooks/useAPI/places';
import { objToFormData } from '@/utils';
import dayjs from 'dayjs';

export default function ActivityCreateForm() {
  const { styles, theme } = useStyles(stylesheet);
  const router = useRouter();

  const { data: userInfo } = UseGetMyUserInfo();
  const { data: categoriesData, isLoading: isLoadingCategories } = UseGetCategories();
  const { categories } = categoriesData || {};

  const { data: placesData, isLoading: isLoadingPlaces } = UseGetPlaces();
  const { content: places } = placesData || {};

  const {
    formState: { isValid, isSubmitting, errors, isDirty },
    control,
    handleSubmit,
    setValue,
  } = useForm<ActivityInfo>({
    resolver: zodResolver(ActivityInfoSchema),
    defaultValues: {
      hostUserId: userInfo?.userId,
      duration: 30,
    },
  });

  const createMutation = UseCreateActivity();

  const onSummit = handleSubmit(async activityData => {
    createMutation.mutate(activityData, {
      onSuccess: () => {
        console.log('onSuccess in CreateActivityPage');
        ToastAndroid.show('New activity created', ToastAndroid.SHORT);
        router.push('/(app)/(tabs)/');
      },
      onError: error => {
        console.log('error');
        console.log(error);
      },
    });
  });

  const usePreset = () => {
    setValue('categoryId', 1);
    setValue('title', 'test_title-' + Math.random().toString());
    setValue('description', 'test_description');
    setValue('dateTime', '2024-03-10T16:20:44.431667Z');
    setValue('duration', 30);
    setValue('noOfMembers', 10);
  };

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView style={styles.container}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              enableErrors
              error={error}
              label="ชื่อกิจกรรม"
              placeholder={'ชื่อกิจกรรม'}
              maxLength={100}
              showCharCounter
            />
          )}
        />

        <Controller
          control={control}
          name="dateTime"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <AppDatetimePicker value={value} onChangeDatetime={onChange}>
              <RNUITextField
                value={value ? dayjs(value).format('DD/MM/YYYY HH:mm') : ''}
                label="วันและเวลา"
                placeholder={'เลือกวัน'}
                readonly
                enableErrors
                error={error}
              />
            </AppDatetimePicker>
          )}
        />

        <Controller
          control={control}
          name="lineGroupUrl"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              enableErrors
              error={error}
              label="ลิงค์กลุ่ม (เช่น line, discord)"
              placeholder={'ชื่อกิจกรรม'}
            />
          )}
        />

        {/*  <RNUITextField
              keyboardType="numeric"
              value={value ? value.toString() : ''}
              onBlur={onBlur}
              onChangeText={text => onChange(parseInt(text, 10))}
              enableErrors
              error={error}
              placeholder={'ระยะเวลา (นาที)'}
            /> */}
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Picker
              placeholder={'เลือกประเภทกิจกรรม'}
              value={value}
              enableModalBlur={false}
              onChange={onChange}
              onBlur={onBlur}
              topBarProps={{ title: 'กิจกรรม' }}
              showSearch
              searchPlaceholder={'เลือกประเภทกิจกรรม'}
              renderPicker={(_value?: any, label?: string) => (
                <RNUITextField
                  value={label}
                  placeholder={'เลือกกิจกรรม'}
                  enableErrors
                  error={error}
                />
              )}
            >
              {categories?.map(category => (
                <Picker.Item
                  key={category.categoryId}
                  value={category.categoryId}
                  label={category.name}
                />
              ))}
            </Picker>
          )}
        />
        <Controller
          control={control}
          name="locationId"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <Picker
              placeholder={'เลือกสถานที่'}
              value={value}
              enableModalBlur={false}
              onChange={onChange}
              onBlur={onBlur}
              topBarProps={{ title: 'สถานที่' }}
              showSearch
              searchPlaceholder={'Search a category'}
              renderPicker={(_value?: any, label?: string) => (
                <RNUITextField
                  value={label}
                  placeholder={'เลือกสถานที่'}
                  enableErrors
                  error={error}
                />
              )}
            >
              {/* <TouchableOpacity
                style={{
                  paddingHorizontal: 20,
                  height: 56.5,
                  flexDirection: 'row',
                  gap: 8,
                  borderBottomWidth: 1,
                  borderColor: '#E8ECF0',
                  alignItems: 'center',
                }}
                onPress={() => router.push('/activities/create-place')}
              >
                <Entypo name="plus" size={24} color="black" />
                <Text style={theme.typography.md}>สร้างสถานที่ใหม่</Text>
              </TouchableOpacity> */}
              {places?.map(place => (
                <Picker.Item key={place.locationId} value={place.locationId} label={place.name} />
              ))}
            </Picker>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              enableErrors
              error={error}
              label="รายละเอียด"
              placeholder={'รายละเอียดกิจกรรม'}
              maxLength={100}
              showCharCounter
              multiline={true}
              numberOfLines={3}
            />
          )}
        />

        <Controller
          control={control}
          name="noOfMembers"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              keyboardType="numeric"
              value={value && value > 0 ? value.toString() : ''}
              onBlur={onBlur}
              onChangeText={text => onChange(parseInt(text, 10))}
              enableErrors
              error={error}
              label="จำนวนคน"
              placeholder={'จำนวนคน'}
              maxLength={100}
            />
          )}
        />

        <View style={styles.datetimeContainer}></View>
        <View style={styles.optionsSetting}></View>
      </ScrollView>
      <View style={styles.footer}>
        <RNUIButton label="Preset" onPress={usePreset} />
        <RNUIButton label="Create Activity" onPress={onSummit} />
        {/* <AppButton variant="primary" label="Preset" onPress={usePreset} /> */}
        {/* <AppButton variant="secondary" label="🔮 preset (test)" onPress={usePreset} />
        <AppButton label="Create Activity" onPress={() => onSummit()} fullWidth /> */}
      </View>
    </KeyboardAvoidingWrapper>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flex: 1,
    paddingVertical: spacings.md,
  },
  // content: {
  //   padding: spacings.md,
  // },
  datetimeContainer: {},
  optionsSetting: {},
  footer: {
    flexDirection: 'row',
    gap: spacings.sm,
    padding: spacings.md,
    backgroundColor: colors.background,
  },
}));
