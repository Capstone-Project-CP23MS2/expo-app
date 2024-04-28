import { View, Text } from 'react-native';
import React, { ReactNode, forwardRef, useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetVirtualizedList,
  BottomSheetModalProps,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = BottomSheetModalProps & {
  // title: string;
  children?: ReactNode;
  // snapPoints?: Array<number | `${number}%`>;
  // indicatorHidden?: boolean;
  onEdit: () => void;
  onOpenDeleteModal: () => void;
  // onDismiss?: () => void;
  isOwner: boolean;
};

type Ref = BottomSheetModal;

const OptionsBottomSheet = forwardRef<Ref, Props>(({ onEdit, onOpenDeleteModal }, ref) => {
  const { styles } = useStyles(stylesheet, {
    indicatorHidden: false,
  });

  // const snapPoints = useMemo(() => ['50%', '75%', '90%'], [])
  const snapPoints = useMemo(() => ['30%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      // index={0}
      onChange={handleSheetChanges}
      // snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      enableDynamicSizing
      handleIndicatorStyle={styles.handleIndicator}
      // style={{ minHeight: 100, flex: 0 }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.ownerSettingSection}>
          <TouchableOpacity style={styles.settingContainer} activeOpacity={0.5} onPress={onEdit}>
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
            <Text style={styles.settingTitle}>แก้ไข</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingContainer}
            activeOpacity={0.5}
            onPress={onOpenDeleteModal}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
            <Text style={styles.settingTitle}>ลบ</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  contentContainer: {
    // backgroundColor: '#DAF7A6',
    paddingHorizontal: spacings.page,
    paddingTop: spacings.page,
    paddingBottom: spacings.page,
    gap: spacings.xs,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.95)',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  handleIndicator: {
    variants: {
      indicatorHidden: {
        true: {
          height: 0,
        },
      },
    },
  },
  settingContainer: {
    flexDirection: 'row',
    gap: spacings.sm,
    alignItems: 'center',
    padding: spacings.lg,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  settingTitle: {
    ...typography.md,
    color: colors.onPrimaryContainer,
  },
  ownerSettingSection: {
    // gap: spacings.md,
    borderRadius: spacings.md,
    overflow: 'hidden',
  },
}));

export default OptionsBottomSheet;
