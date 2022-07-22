import {Colors} from 'app/assets/constants/colors/Colors';
import React from 'react';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  StyleSheet,
} from 'react-native';

interface IProps extends TextInputProps {
  containerStyle?: Record<string, unknown>;
  isDark?: boolean;
  isError?: boolean;
  error?: string;
  isSecure?: boolean;
  customInputStyle?: TextStyle;
}

export const Input: React.FC<IProps> = props => {
  const {
    numberOfLines = 1,
    value,
    onChangeText,
    containerStyle,
    placeholder,
    isSecure = false,
    customInputStyle = {},
  } = props;
  const multiline = numberOfLines && numberOfLines > 1;
  return (
    <View style={[containerStyle]}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
        value={value}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        style={{
          ...InputStyle.input,
          backgroundColor: Colors._FFFFFF,
          color: Colors._DBDBDB,
          borderRadius: 8,
          height: multiline ? numberOfLines * 19 + 17 : 19 + 17,
          ...customInputStyle,
        }}
        secureTextEntry={isSecure}
        multiline={numberOfLines > 1}
        placeholderTextColor={Colors._DBDBDB}
      />
    </View>
  );
};

const InputStyle = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 6,
  },
  inputContainer: {
    borderColor: Colors._34C759,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors._34C759,
    marginBottom: 6,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
  errorText: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 13,
    color: Colors._007AFF,
  },
  emoji: {
    width: 22,
    height: 22,
  },
  calendarIcon: {
    width: 18,
    height: 18,
    margin: 12,
  },
  attention: {
    width: 13,
    height: 13,
    marginRight: 4,
    marginTop: 9,
  },
  input: {
    padding: 0,
    flex: 1,
    paddingTop: 15,
    paddingBottom: 16,
    fontSize: 17,
    color: Colors._000000,
    textAlignVertical: 'center',
  },
  text1: {
    fontSize: 17,
    flex: 1,
    marginVertical: 15,
    color: Colors._000000,
  },
  text2: {
    fontSize: 17,
    flex: 2,
    marginLeft: 12,
    marginVertical: 15,
    color: Colors._000000,
  },
  text3: {
    fontSize: 17,
    flex: 1,
    marginLeft: 12,
    marginVertical: 15,
    color: Colors._000000,
  },
  placeholderText1: {
    fontSize: 17,
    flex: 1,
    marginVertical: 15,
    color: Colors._DBDBDB,
  },
  placeholderText2: {
    fontSize: 17,
    flex: 2,
    marginLeft: 12,
    marginVertical: 15,
    color: Colors._DBDBDB,
  },
  placeholderText3: {
    fontSize: 17,
    flex: 1,
    marginLeft: 12,
    marginVertical: 15,
    color: Colors._DBDBDB,
  },
  divider: {
    width: 1,
    height: '50%',
    backgroundColor: Colors._DBDBDB,
  },
  borderlessContainer: {
    width: '100%',
  },
  borderlessInputContainer: {
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  borderlessText1: {
    marginLeft: 12,
    fontSize: 17,
    flex: 1,
    color: Colors._000000,
  },
  borderlessText2: {
    marginLeft: 12,
    fontSize: 17,
    flex: 1,
    color: Colors._000000,
  },
  borderlessText3: {
    marginLeft: 12,
    fontSize: 17,
    flex: 1,
    color: Colors._000000,
  },
});
