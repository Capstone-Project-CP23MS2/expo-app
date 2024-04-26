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
    <View style={styles.field}>
      <View style={styles.inputContainer}>
        <View style={{marginRight: 10}}>
          <MaterialIcons name="search" size={22} color="black" />
        </View>
        <TextInput
          style={[styles.textInput, styles.label]}
          placeholder="Explore available activities"
          placeholderTextColor="#c0c0c0"
          onChangeText={onSearchChanged}
          value={searchQuery}
        />
      </View>
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
  );
};

const stylesheet = createStyleSheet(({ colors, spacings, typography }) => ({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  field: {
    ...typography.sm,
    backgroundColor: colors.onPrimary,
    borderRadius: spacings.ssm,
    flexGrow: 1,
    maxWidth: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    flexGrow: 1,
    minHeight: 48,
  },
  label: {
    ...typography.sm,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    overflow: 'hidden',
    marginHorizontal: spacings.xs,
  },
  iconWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Searchbar;
