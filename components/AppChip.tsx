import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Chip, ChipProps } from 'react-native-ui-lib';

// export type ChipType = 'contained' | 'outlined' | 'text' | 'disable';
// export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'disable';
// export type ButtonSize = 'sm' | 'md' | 'lg';
type Props = ChipProps & {
  // type?: ChipType;
};

const AppChip = (props: Props) => {
  const { styles } = useStyles(stylesheet, {
    hasIcon: !!props.leftElement,
  });

  return (
    <Chip
      backgroundColor="#F5F5F5"
      containerStyle={styles.container}
      labelStyle={styles.label}
      iconStyle={{ padding: 20 }}
      {...props}
      activeOpacity={0.5}
    />
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    borderColor: colors.secondary,
    borderRadius: spacings.lg,
    // backgroundColor: colors.secondary,
    variants: {
      hasIcon: {
        true: {
          paddingLeft: spacings.xs,
        },
        false: {
          paddingLeft: spacings.sm,
        },
      },
    },
  },
  label: {
    ...typography.smB,
    lineHeight: 24,

    marginVertical: spacings.xs,
  },
}));

export default AppChip;
