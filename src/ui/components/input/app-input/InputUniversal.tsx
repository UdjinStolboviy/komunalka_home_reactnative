import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  validateNameWithSpaces,
  validateNumberWithSpaces,
} from '../../../../utils/validator';

import {observer} from 'mobx-react';
import {Colors} from 'app/assets/constants/colors/Colors';
import {InputButton} from 'app/ui/components/button/AppButton/InputButton';

export interface InputUniversalProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange?: (text: string) => void;
  focusedScreen?: boolean;
  placeholderInput?: string;
  defaultValue?: string;
  typeKeyboard?:
    | 'default'
    | 'numeric'
    | 'number-pad'
    | 'decimal-pad'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  validateText?:
    | 'default'
    | 'numeric'
    | 'number-pad'
    | 'decimal-pad'
    | 'email-address'
    | 'phone-pad'
    | 'url';
}

export interface InputUniversalRef {
  clear: () => void;
}

export const InputUniversal = forwardRef((props: InputUniversalProps, ref) => {
  useImperativeHandle(ref, () => ({
    clear() {
      setChosenText('');
      setText('');
    },
  }));
  const inputRef = useRef<TextInput>(null);

  const [focused, setFocused] = useState(props.focusedScreen);
  const [textValid, setTextValid] = useState<boolean>(false);
  const [chosenText, setChosenText] = useState<string>('');
  const [buttonType, setButtonType] = useState<
    'clear' | 'add' | 'none' | 'loader'
  >('none');
  const [loadingLabels, setLoadingLabels] = useState<boolean>(false);
  const [text, setText] = useState<string>(
    props.defaultValue ? props.defaultValue : '',
  );
  let initialText = useRef<string>(text).current;

  useEffect(() => {
    _checkButtonType();
    _validateText();
  }, [text]);

  const _validateText = () => {
    if (props.validateText === 'numeric') {
      return setTextValid(validateNumberWithSpaces(text));
    }
    if (props.validateText === 'default') {
      return setTextValid(true);
    }
    setTextValid(validateNameWithSpaces(text));
  };

  const _commitDropdown = (action: 'open' | 'close') => {
    if (action === 'open') {
      setFocused(true);
    } else {
      setFocused(false);
    }
  };

  const _onBlur = () => {
    _commitDropdown('close');
    setFocused(false);
    if (text.trim().toLowerCase() === initialText.trim().toLowerCase()) {
      return;
    }
    if (!textValid) {
      setText(initialText);
      return;
    } else {
      _saveText();
    }
  };

  const ValidDisplayText = () => {
    if (!textValid) {
      return (
        <View style={style.validNameWrapper}>
          <Text style={style.validNameText} onPress={_onEditPress}>
            {props.placeholderInput}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const _onFocus = () => {
    _commitDropdown('open');
    setFocused(true);
  };

  const _saveText = () => {
    console.log('save number');
    setFocused(false);
    setChosenText(text);
    props.onTextChange && props.onTextChange(text);
  };
  const _onEditPress = () => {
    setFocused(true);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 100);
  };

  const _addText = () => {
    setChosenText(text);
    props.onTextChange && props.onTextChange(chosenText);
  };

  const _deleteText = () => {
    setChosenText('');
    setText('');
    props.onTextChange && props.onTextChange('');
  };

  const _checkButtonType = () => {
    if (loadingLabels && focused) {
      setButtonType('loader');
      return;
    }
    if (text.length === 0 && focused) {
      setButtonType('none');
      return;
    }

    if (text.trim().length >= 0) {
      setButtonType('clear');
      return;
    }
    setButtonType('add');
  };

  return (
    <View style={[style.container, props.containerStyle]}>
      <TouchableOpacity
        style={[
          style.textIconWrapper,
          {
            borderColor: textValid ? Colors._007AFF : Colors._248900,
          },
        ]}
        onPress={_onEditPress}>
        {focused ? (
          <View style={style.inputContainer}>
            <TextInput
              ref={inputRef}
              style={[
                style.inputWrapper,
                textValid ? {color: Colors._007AFF} : {color: Colors._CF480E},
              ]}
              onFocus={_onFocus}
              placeholder={props.placeholderInput}
              onChangeText={text => setText(text)}
              onBlur={_onBlur}
              maxLength={50}
              value={text}
              keyboardType={props.typeKeyboard ? props.typeKeyboard : 'default'}
            />
            <InputButton
              buttonType={buttonType}
              pressClear={_deleteText}
              pressAdd={() => _addText()}
            />
          </View>
        ) : (
          <Text numberOfLines={3} style={style.textInput}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
      {!focused ? <ValidDisplayText /> : null}
    </View>
  );
});

const style = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
    alignSelf: 'center',
    minHeight: 35,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: Colors._FFFFFF,
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  textIconWrapper: {
    width: '100%',
    minHeight: 35,
    borderRadius: 12,
    borderBottomWidth: 1,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors._FFFFFF,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  inputWrapper: {
    width: '85%',
    marginTop: 4,

    backgroundColor: Colors._FFFFFF,
    minHeight: 35,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
    color: Colors._488296,
  },
  textInput: {
    textAlign: 'center',
    minHeight: 35,
    fontSize: 18,
    paddingTop: 8,
    fontWeight: '500',
    paddingHorizontal: 10,
    color: Colors._007AFF,
  },

  validNameWrapper: {
    position: 'absolute',
    width: '100%',
    top: 10,
    left: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  validNameText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: Colors._979797,
  },
});
