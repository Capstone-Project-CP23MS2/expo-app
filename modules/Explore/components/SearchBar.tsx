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

const SearchBar = ({ searchQuery, onSearchChanged }: Props) => {
  const { styles } = useStyles(stylesheet);
  const handleClearQuery = () => {
    onSearchChanged('');
  };
  return (
    <View style={styles.container}>
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
            style={[
              styles.iconWrapper,
              { opacity: searchQuery.length && searchQuery.length ? 100 : 0 },
            ]}
            android_ripple={{ color: 'gray' }}
            onPress={handleClearQuery}
          >
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  container: {
    flexGrow: 1,
    // minHeight: 50,
    maxHeight: 50,
  },
  field: {
    // flexGrow: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: spacings.xl,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    flexGrow: 1,
    // minHeight: 50,
    // marginHorizontal: spacings.xs,
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

export default SearchBar;
