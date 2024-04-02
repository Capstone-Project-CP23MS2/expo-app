import { View, Text } from 'react-native'
import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type Props = {
  title: string
}
type Ref = BottomSheet

const CustomBottomSheet = forwardRef<Ref, Props>((props, ref) => {
  const { styles } = useStyles(stylesheet)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  const handleClosePress = () => bottomSheetRef.current?.close()
  const handleOpenPress = () => bottomSheetRef.current?.expand()
  const handleCollapsePress = () => bottomSheetRef.current?.collapse()
  const snapToIndex = (index: number) => bottomSheetRef.current?.snapToIndex(index)
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 49 }}
      />
    ),
    [],
  )

  return (
    <BottomSheet
      ref={ref}
      index={2}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: 'black' }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>{props.title}</Text>
      </BottomSheetView>
    </BottomSheet>
  )
})

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    padding: theme.spacings.md,
    backgroundColor: theme.colors.background,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    ...theme.typography.md,
    color: theme.colors.typography,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
}))

export default CustomBottomSheet
