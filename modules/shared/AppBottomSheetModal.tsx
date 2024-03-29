import { View, Text } from 'react-native'
import React, { ReactNode, forwardRef, useCallback, useMemo, useRef } from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal,
  BottomSheetVirtualizedList,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

type Props = BottomSheetModalProps & {
  title: string
  children?: ReactNode
  snapPoints?: Array<number | `${number}%`>
}

type Ref = BottomSheetModal

const AppBottomSheetModal = forwardRef<Ref, Props>((props, ref) => {
  const { title, children, snapPoints: propsSnapPoints, ...otherProps } = props
  const { styles } = useStyles(stylesheet)

  // const snapPoints = useMemo(() => ['50%', '75%', '90%'], [])
  const snapPoints = useMemo(() => ['50%', '75%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    [],
  )

  const RenderBody = () => {
    if (children) {
      return children
    }
    return (
      <BottomSheetView style={styles.contentContainer}>
        <Text>{props.title}</Text>
      </BottomSheetView>
    )
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      onChange={handleSheetChanges}
      // enableDynamicSizing={true}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      {...otherProps}
    >
      <RenderBody />
    </BottomSheetModal>
  )
})

const stylesheet = createStyleSheet(theme => ({
  contentContainer: {
    // flex: 1,
    // alignItems: 'center',
    backgroundColor: '#DAF7A6',
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
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
}))

export default AppBottomSheetModal
