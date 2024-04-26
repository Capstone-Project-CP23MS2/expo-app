import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONT, SIZES } from '@/constants';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { BaseButton, BaseButtonProps } from 'react-native-gesture-handler';
import { RNUIButton } from '@/components';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'disable';

type Props = BaseButtonProps & {
  variant?: Color;
  label?: string;
  fullWidth?: boolean;
  round?: boolean;
  // onPress: () => void
  // enabled?: boolean
};

const AppButton = ({ variant, label, fullWidth, enabled, ...otherProps }: Props) => {
  const { styles, breakpoint, theme } = useStyles(stylesheet, {
    color: variant,
    fullWidth: fullWidth,
  });

  return (
    // <RNUIButton label="label" {...otherProps} />
    <BaseButton style={styles.container} enabled={enabled} {...otherProps}>
      <Text style={styles.label}>{label}</Text>
    </BaseButton>
  );
};

export default AppButton;

const stylesheet = createStyleSheet(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    // ...theme.component.button.contained,
    // height: 48,
    variants: {
      color: {
        default: {
          backgroundColor: COLORS.primary,
        },
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        tertiary: {
          backgroundColor: COLORS.tertiary,
        },
        danger: {
          backgroundColor: COLORS.red,
        },
        disable: {
          backgroundColor: theme.colors.primary,
        },
      },
      type: {
        outlined: {},
        contained: {},
      },
      fullWidth: {
        true: {
          flexGrow: 1,
        },
      },
    },
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    lineHeight: 24,
  },
}));
