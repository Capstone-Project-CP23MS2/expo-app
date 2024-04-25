import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Chip, ChipProps } from 'react-native-ui-lib';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// export type ChipType = 'contained' | 'outlined' | 'text' | 'disable';
// export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'disable';
// export type ButtonSize = 'sm' | 'md' | 'lg';
type Props = ChipProps & {
  // type?: ChipType;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  RightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

const AppChip = (props: Props) => {
  const { leftIcon, RightIcon, ...RNUIProps } = props;
  const { styles } = useStyles(stylesheet, {
    hasIcon: !!props.leftElement,
    hasLeftIcon: !!props.leftIcon,
    hasRightIcon: !!props.RightIcon,
  });
  return (
    <Chip
      backgroundColor="#F5F5F5"
      containerStyle={styles.container}
      labelStyle={styles.label}
      {...RNUIProps}
      leftElement={
        props.leftIcon && (
          <MaterialCommunityIcons style={styles.leftIcon} name={props.leftIcon} size={20} />
        )
      }
      rightElement={
        props.RightIcon && (
          <MaterialCommunityIcons style={styles.rightIcon} name={props.RightIcon} size={20} />
        )
      }
      activeOpacity={0.5}
    />
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    borderColor: colors.secondaryContainer,
    borderWidth: 0,
    borderRadius: spacings.lg,
    backgroundColor: colors.secondaryContainer,
    variants: {
      hasIcon: {
        true: {
          // paddingLeft: spacings.xs,
        },
        false: {
          // paddingLeft: spacings.sm,
        },
      },
    },
  },
  label: {
    ...typography.smB,
    color: colors.onSecondaryContainer,
    lineHeight: 24,
    marginVertical: spacings.xs,
    marginLeft: spacings.md,
    variants: {
      hasLeftIcon: {
        true: {
          marginLeft: spacings.xs,
        },
        false: {
          marginLeft: spacings.md,
        },
      },
      hasRightIcon: {
        true: {
          marginRight: spacings.xs,
        },
        false: {
          marginRight: spacings.md,
        },
      },
    },
  },
  leftIcon: {
    marginLeft: spacings.sm,
  },
  rightIcon: {
    marginRight: spacings.sm,
  },
}));

export default AppChip;
