import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TextField as TFRN } from 'react-native-ui-lib';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
  searchQuery: string;
  onSearchChanged: (terms: string) => void;
  // onClearQuery: () => void;
};

const Searchbar = ({ searchQuery, onSearchChanged }: Props) => {
  const { styles } = useStyles(stylesheet);
  const handleClearQuery = () => {
    onSearchChanged('');
  };
  return (
    <>
      <View style={styles.field}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="magnify" size={24} color="black" />
            {/* <MaterialCommunityIcons name="arrow-left" size={24} color="black" /> */}
          </View>
        </View>
        <TextInput
          style={[styles.textInput, styles.label]}
          placeholder="Search"
          onChangeText={onSearchChanged}
          value={searchQuery}
          // autoCorrect={false}
          // secureTextEntry={hidePassword}
          // editable={!disabled}
          // placeholderTextColor={placeholderTextColor ? `${textColor}` : '#c0c0c0'}
          // autoFocus={autoFocus}
          // {...props}
        />
        <View style={styles.iconContainer}>
          <Pressable
            style={[styles.iconWrapper, { opacity: searchQuery.length ? 100 : 0 }]}
            android_ripple={{ color: 'gray' }}
            onPress={handleClearQuery}
          >
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    //   // flex: 1,
  },
  field: {
    ...typography.md,
    // paddingHorizontal: spacings.lg,
    backgroundColor: '#edd2be',
    borderRadius: spacings.xl,
    flexGrow: 1,
    maxWidth: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    flexGrow: 1,
    minHeight: 48,
    marginHorizontal: spacings.xs,
  },
  label: {
    ...typography.md,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    overflow: 'hidden',
    margin: spacings.xs,
  },
  iconWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Searchbar;
