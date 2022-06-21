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
import {validateNameWithSpaces} from '../../../../utils/validator';
import {IAppCoreService} from '../../../../services/core/app.core.service.interface';

import {observer} from 'mobx-react';
import {useAppInjection} from 'app/data/ioc/inversify.config';
import {Colors} from 'app/assets/constants/colors/Colors';
import {InputButton} from 'app/ui/components/button/AppButton/InputButton';

export interface InputUniversalProps {
  containerStyle?: StyleProp<ViewStyle>;
  onTextChange?: (text: string) => void;
}

export interface InputUniversalRef {
  clear: () => void;
}

export const InputUniversal = observer(
  forwardRef((props: InputUniversalProps, ref) => {
    const app: IAppCoreService = useAppInjection();
    const inputRef = useRef<TextInput>(null);

    const [focused, setFocused] = useState(false);
    const [companyNameValid, setCompanyNameValid] = useState<boolean>(false);
    const [chosenText, setChosenText] = useState<string>('');
    const [buttonType, setButtonType] = useState<
      'clear' | 'add' | 'none' | 'loader'
    >('none');
    const [loadingLabels, setLoadingLabels] = useState<boolean>(false);
    const [text, setText] = useState<string>('47755');
    let initialCompanyName = useRef<string>(text).current;

    useEffect(() => {
      _checkButtonType();
      _validateCompanyName();
    }, [text]);

    useImperativeHandle(ref, () => ({
      clear() {
        console.log('clear');
      },
    }));

    const _validateCompanyName = () => {
      setCompanyNameValid(validateNameWithSpaces(text));
    };

    const _commitDropdown = (action: 'open' | 'close') => {
      if (action === 'open') {
        console.log('Open');
      } else {
        console.log('close');
      }
    };

    const _onPress = () => {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 50);
      setFocused(true);
    };

    const _onBlur = () => {
      _commitDropdown('close');
      setFocused(false);
      if (
        text.trim().toLowerCase() === initialCompanyName.trim().toLowerCase()
      ) {
        return;
      }
      if (!companyNameValid) {
        setText(initialCompanyName);
        return;
      } else {
        _saveText();
      }
    };

    const ValidDisplayName = () => {
      if (!companyNameValid) {
        return (
          <View style={style.validNameWrapper}>
            <Text style={style.validNameText}>error</Text>
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
      setChosenText(text);
      props.onTextChange && props.onTextChange(text);
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
      if (loadingLabels) {
        setButtonType('loader');
        return;
      }
      if (text.length === 0) {
        setButtonType('none');
        return;
      }

      if (text.trim().length >= 5) {
        setButtonType('add');
        return;
      }
      setButtonType('clear');
    };

    return (
      <>
        <View style={[style.container, props.containerStyle]}>
          <View style={style.textIconWrapper}>
            {focused ? (
              <TextInput
                ref={inputRef}
                style={[
                  style.inputWrapper,
                  companyNameValid ? null : {color: Colors._578FA2},
                ]}
                onFocus={_onFocus}
                onChangeText={text => setText(text)}
                onBlur={_onBlur}
                maxLength={50}
                value={text}
              />
            ) : (
              <Text numberOfLines={3} style={style.inputWrapper}>
                {text}
              </Text>
            )}
            {!focused ? (
              <TouchableOpacity
                style={style.iconWrapper}
                activeOpacity={0.8}
                onPress={_onPress}>
                <Text>...</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={style.iconWrapper}
                activeOpacity={0.8}
                onPress={_deleteText}>
                <Text>d</Text>
              </TouchableOpacity>
            )}
            <InputButton
              buttonType={buttonType}
              pressClear={_deleteText}
              pressAdd={() => _addText()}
            />
          </View>
        </View>
        <ValidDisplayName />
      </>
    );
  }),
);

const style = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(86, 86, 86, 0.2)',
    width: '100%',
    alignSelf: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  textIconWrapper: {
    width: '100%',
    flexDirection: 'row',
    minHeight: 17,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '90%',
    paddingVertical: 0,
    minHeight: 17,
    fontSize: 14,
    fontWeight: '500',
    color: Colors._488296,
  },
  iconWrapper: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  validNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  validNameText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: Colors._007AFF,
  },
});
