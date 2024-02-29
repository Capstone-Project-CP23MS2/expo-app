import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '@/constants'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { BaseButton, BaseButtonProps } from 'react-native-gesture-handler'

export type Color = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'disable'

type Props = BaseButtonProps & {
  variant: Color
  label: string
  fullWidth?: boolean
  round?: boolean
  // onPress: () => void
  // enabled?: boolean
}

const AppButton = ({ variant, label, fullWidth, enabled, ...otherProps }: Props) => {
  const { styles, breakpoint, theme } = useStyles(stylesheet, {
    color: variant,
    fullWidth: fullWidth,
  })

  return (
    <BaseButton style={styles.container} enabled={enabled} {...otherProps}>
      <Text style={styles.label}>{label}</Text>
    </BaseButton>
  )
}

export default AppButton

const stylesheet = createStyleSheet(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    // ...theme.component.button.contained,
    // height: 48,
    variants: {
      color: {
        default: {
          backgroundColor: theme.colors.primary,
        },
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        tertiary: {
          backgroundColor: theme.colors.primary,
        },
        danger: {
          backgroundColor: theme.colors.primary,
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
          flex: 1,
        },
      },
    },
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
}))
