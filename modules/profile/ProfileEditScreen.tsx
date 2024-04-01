import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserInfo, UpdateUserInfoSchema } from './updateUser.schema';
import { DateTimePicker, Picker } from 'react-native-ui-lib';
import { UseGetMyUserInfo, UseUpdateMyUserInfo } from '@/hooks/useAPI';
import { filterChangedFormFields } from '@/utils';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';
import KeyboardAvoidingWrapper from '@/modules/shared/KeyboardAvoidingWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import { RNUIButton, RNUITextField } from '@/components';

type Props = {};

export default function ProfileEditScreen(props: Props) {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const { onSyncUserInfo } = useAuth();
  const { data: user, isLoading: isLoadingUser } = UseGetMyUserInfo();
  const updateUserInfoMutation = UseUpdateMyUserInfo();
  const genders = [
    { id: 'Male', label: 'ชาย' },
    { id: 'Female', label: 'หญิง' },
    { id: 'Other', label: 'อื่นๆ' },
    { id: 'NotApplicable', label: 'ไม่ระบุ' },
    { id: 'Unknown', label: 'ไม่ทราบ' },
  ];
  const {
    formState: { isValid, isSubmitting, errors, isDirty, dirtyFields },
    control,
    handleSubmit,
  } = useForm<UpdateUserInfo>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      username: user?.username,
      gender: user?.gender,
      dateOfBirth: user?.dateOfBirth,
      phoneNumber: user?.phoneNumber,
      lineId: user?.lineId,
    },
  });

  const onSummit = handleSubmit(async updateData => {
    const filterChangedActivity = filterChangedFormFields(updateData, dirtyFields);

    updateUserInfoMutation.mutate(
      { userId: user?.userId!, updateRequest: filterChangedActivity },
      {
        onSuccess: user => {
          console.log('onSuccess in UpdateProfilePage');
          onSyncUserInfo(user);
          router.back();
        },
        onError: error => {
          console.log('error');
          console.log(error);
        },
      },
    );
  });

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              enableErrors
              error={error}
              label="ชื่อผู้ใช้งาน"
              placeholder={'ชื่อผู้ใช้งาน'}
              maxLength={100}
              showCharCounter
            />
          )}
        />
        <Controller
          control={control}
          name="lineId"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              enableErrors
              error={error}
              label="ID Line"
              placeholder={'ID Line'}
              maxLength={24}
              showCharCounter
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, onBlur, value } }) => (
            // Lib บัค item สุดท้ายจม
            <Picker
              placeholder={'select your category'}
              value={value}
              enableModalBlur={false}
              onChange={onChange}
              onBlur={onBlur}
              topBarProps={{ title: 'Gender' }}
              useDialog
              customPickerProps={{
                migrateDialog: true,
                // dialogProps: { bottom: true, width: '100%', height: '45%' },
              }}
              renderPicker={(_value?: any, label?: string) => (
                <RNUITextField value={label} label="เพศ" placeholder={'เลือกเพศ'} enableErrors />
              )}
            >
              {genders?.map(gender => (
                <Picker.Item key={gender.id} value={gender.id} label={gender.label} />
              ))}
            </Picker>
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <RNUITextField
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              enableErrors
              error={error}
              label="เบอร์โทรศัพท์"
              placeholder={'เบอร์โทรศัพท์'}
            />
          )}
        />

        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <DateTimePicker
              value={new Date(value)}
              onChange={date => onChange(date.toISOString())}
              migrateDialog
              containerStyle={{ marginVertical: 20 }}
              label={'Date'}
              placeholder={'Select a date'}
              renderInput={({ value }) => {
                return (
                  <RNUITextField
                    value={value}
                    label="วันเกิด"
                    placeholder={'เลือกวัน'}
                    enableErrors
                  />
                );
              }}
            />
          )}
        />
      </ScrollView>
      <View style={styles.footer}>
        <RNUIButton label="Save" onPress={() => onSummit()} disabled={!isDirty} />
      </View>
    </KeyboardAvoidingWrapper>
  );
}

const stylesheet = createStyleSheet(({ colors, spacings }) => ({
  container: {},
  footer: {
    padding: spacings.md,
    backgroundColor: colors.background,
  },
}));

// const updateUserInfoMutation = UseUpdateMyUserInfo()
// const genderBottomSheetModalRef = useRef<BottomSheetModal>(null)
// const handleGenderSelectorOpen = () => genderBottomSheetModalRef.current?.present()
{
  /* <AppBottomSheetModal
        onDismiss={() => {}}
        title="Updating your profile"
        subtitle="Please wait a moment"
        >
        <BottomSheetView>
        <Text>Updating your profile</Text>
        </BottomSheetView>
      </AppBottomSheetModal> */
}
