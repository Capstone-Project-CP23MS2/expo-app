import { View, Text } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TextField, TextFieldProps } from 'react-native-ui-lib';

type Props = TextFieldProps & {
  error?: { message?: string };
};

//showCharCounter

export default function RNUITextField(props: Props) {
  const { styles } = useStyles(stylesheet);
  const { error, ...restProps } = props;

  return (
    <TextField
      containerStyle={styles.container}
      fieldStyle={styles.field}
      labelStyle={styles.label}
      validationMessageStyle={styles.errorMessage}
      charCounterStyle={styles.charCounter}
      style={styles.textInput}
      validationMessage={error?.message}
      {...restProps}
    />
  );
}

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {},
  field: {
    ...typography.md,
    paddingHorizontal: spacings.md,
    backgroundColor: colors.background,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 80,
    // paddingLeft: 13,
    paddingVertical: spacings.sm,
  },
  textInput: {
    ...typography.md,
  },
  label: {
    ...typography.sm,
    paddingHorizontal: spacings.md,
  },
  errorMessage: {
    ...typography.sm,
    color: colors.danger,
    paddingLeft: spacings.md,
  },
  charCounter: {
    ...typography.sm,
    paddingRight: spacings.md,
  },
}));
