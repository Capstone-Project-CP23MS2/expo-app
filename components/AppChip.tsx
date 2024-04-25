import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Chip, ChipProps } from 'react-native-ui-lib';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// export type ChipType = 'contained' | 'outlined' | 'text' | 'disable';
export type ChipColor = 'primary' | 'secondary';
// | 'tertiary' | 'danger' | 'disable'
// export type ButtonSize = 'sm' | 'md' | 'lg';
type Props = ChipProps & {
  color?: ChipColor;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  RightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

const AppChip = (props: Props) => {
  const { color, leftIcon, RightIcon, ...RNUIProps } = props;
  const { styles } = useStyles(stylesheet, {
    color: color,
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
          <MaterialCommunityIcons
            style={[styles.icon, styles.leftIcon]}
            name={props.leftIcon}
            size={20}
          />
        )
      }
      rightElement={
        props.RightIcon && (
          <MaterialCommunityIcons
            style={[styles.icon, styles.rightIcon]}
            name={props.RightIcon}
            size={20}
          />
        )
      }
      activeOpacity={0.5}
    />
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    borderWidth: 0,
    borderRadius: spacings.lg,
    variants: {
      color: {
        default: {
          backgroundColor: colors.primaryContainer,
        },
        primary: {
          backgroundColor: colors.primaryContainer,
        },
        secondary: {
          backgroundColor: colors.secondaryContainer,
        },
      },
    },
  },
  label: {
    ...typography.smB,
    lineHeight: 24,
    marginVertical: spacings.xs,
    marginLeft: spacings.md,
    variants: {
      color: {
        default: {
          color: colors.onPrimaryContainer,
        },
        primary: {
          color: colors.onPrimaryContainer,
        },
        secondary: {
          color: colors.onSecondaryContainer,
        },
      },
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
  icon: {
    variants: {
      color: {
        default: {
          color: colors.onPrimary,
        },
        primary: {
          color: colors.onPrimary,
        },
        secondary: {
          color: colors.onSecondary,
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
