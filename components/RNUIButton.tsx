import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Button, ButtonProps } from 'react-native-ui-lib';

export type ButtonType = 'contained' | 'outlined' | 'text' | 'disable';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'disable';
export type ButtonSize = 'sm' | 'md' | 'lg';

type Props = ButtonProps & {
  error?: { message?: string };
  color?: ButtonColor;
  type?: ButtonType;
  // size?: Size
};

//showCharCounter

export default function RNUIButton(props: Props) {
  const { color, type, error, ...restProps } = props;
  const { styles } = useStyles(stylesheet, {
    type: type,
    color: color,
    // size: size,
  });

  return (
    <Button
      style={[styles.container, styles.extraStyle(color)]}
      iconStyle={[styles.icon]}
      labelStyle={[styles.label, styles.labelType(color)]}
      outlineWidth={1}
      {...restProps}
    />
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    paddingVertical: spacings.md,
    // width: '100%',
    flexGrow: 1,
    borderRadius: spacings.md,
    variants: {},
  },
  extraStyle: (color: ButtonColor = 'primary') => ({
    variants: {
      type: {
        default: {
          backgroundColor: colors[color],
        },
        contained: {
          backgroundColor: colors[color],
        },
        outlined: {
          // borderColor: colors[color],
          color: colors[color],
          // borderWidth: 20,
          boxShadow: 'inset 0 -5px 0 red',
          boxSizing: 'border-box',
          // boxSizing: 'content-box',
        },
        text: {
          color: colors[color],
        },
        disable: {
          backgroundColor: colors.disable,
        },
      },
    },
  }),
  icon: {},
  label: {
    ...typography.mdB,
    variants: {},
  },
  labelType: (color: ButtonColor = 'primary') => ({
    variants: {
      type: {
        contained: {},
        outlined: {
          color: colors[color],
        },
        text: {
          color: colors[color],
        },
        disable: {
          backgroundColor: colors.disable,
        },
      },
    },
  }),
  test: (type: ButtonType, color: ButtonColor = 'primary') => {
    // if (type === 'contained') {
    //   return {
    //     backgroundColor: colors[color],
    //   }
    // }
    // if (type === 'outlined') {
    //   return {}
    // }

    return {};
  },
}));
