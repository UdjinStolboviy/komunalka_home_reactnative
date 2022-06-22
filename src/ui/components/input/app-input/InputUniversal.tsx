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
import {IAppCoreService} from '../../../../services/core/app.core.service.interface';

import {observer} from 'mobx-react';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {Colors} from 'app/assets/constants/colors/Colors';
import {InputButton} from 'app/ui/components/button/AppButton/InputButton';
import {Texts} from 'app/assets/constants/codes/Texts';

export interface InputUniversalProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange?: (text: string) => void;
  focusedScreen?: boolean;
  placeholderInput?: string;
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

export const InputUniversal = observer(
  forwardRef((props: InputUniversalProps, ref) => {
    const app: IAppCoreService = useAppInjection();
    const inputRef = useRef<TextInput>(null);

    const [focused, setFocused] = useState(props.focusedScreen);
    const [textValid, setTextValid] = useState<boolean>(false);
    const [chosenText, setChosenText] = useState<string>('');
    const [buttonType, setButtonType] = useState<
      'clear' | 'add' | 'none' | 'loader'
    >('none');
    const [loadingLabels, setLoadingLabels] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    let initialText = useRef<string>(text).current;

    useEffect(() => {
      _checkButtonType();
      _validateText();
    }, [text]);

    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));

    const _validateText = () => {
      if (props.validateText === 'numeric') {
        return setTextValid(validateNumberWithSpaces(text));
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

    // const ValidDisplayName = () => {
    //   if (!textValid) {
    //     return (
    //       <View style={style.validNameWrapper}>
    //         <Text style={style.validNameText}>{Texts.NOT_THE_RIGHT_MEAN}</Text>
    //       </View>
    //     );
    //   } else {
    //     return null;
    //   }
    // };

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
              borderColor: textValid ? Colors._007AFF : Colors._CF480E,
            },
          ]}
          onPress={_onEditPress}>
          {focused && chosenText ? (
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
          ) : (
            <Text numberOfLines={3} style={style.textInput}>
              {text}
            </Text>
          )}
          {focused ? (
            <InputButton
              buttonType={buttonType}
              pressClear={_deleteText}
              pressAdd={() => _addText()}
            />
          ) : null}
        </TouchableOpacity>
        {/* <ValidDisplayName /> */}
      </View>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: '30%',
    alignSelf: 'center',
    minHeight: 35,
    borderRadius: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors._007AFF,
  },
  textIconWrapper: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 35,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: Colors._FFFFFF,
    paddingVertical: 0,
    minHeight: 35,
    paddingHorizontal: '3%',
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '500',
    color: Colors._488296,
  },
  textInput: {
    minHeight: 17,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: '3%',
    color: Colors._007AFF,
  },
  iconWrapper: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  validNameWrapper: {
    position: 'absolute',
    top: 26,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  validNameText: {
    marginLeft: 6,
    fontSize: 10,
    fontWeight: '700',
    color: Colors._007AFF,
  },
});
