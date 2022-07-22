import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {View, Image, Platform, StyleSheet} from 'react-native';

import {Text} from '../../components/Common/Text';

import DropDownPicker from 'react-native-dropdown-picker';

import {FONTS} from 'app/assets/constants/codes/Fonts';
import {Colors} from 'app/assets/constants/colors/Colors';

export interface IOptionItem {
  label: string;
  key: number;
}

interface IProps {
  title?: string;
  items: IOptionItem[];
  showArrow?: boolean;
  errorText?: string;
  onSelected?: (item: any) => void;
  placeholder?: string;
  value?: number;
  open: boolean;
  onOpen?: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  zIndex: number;
  zIndexInverse: number;
  noBorder?: boolean;
  placeholderColor?: string;
}

export const PickerComponent: React.FC<IProps> = props => {
  const {
    title,
    showArrow,
    onSelected,
    errorText,
    placeholder,
    open,
    setOpen,
    onOpen,
    zIndex,
    zIndexInverse,
    noBorder,
    placeholderColor,
  } = props;

  const [value, setValue] = useState<any>(props.value || null);
  const [items, setItems] = useState<any>(props.items);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <View
      style={[
        styles.container,
        Platform.OS !== 'android' ? {zIndex: 10} : null,
      ]}>
      <>
        <Text isSFP normal style={styles.pickerLabel}>
          {title}
        </Text>
        <DropDownPicker
          style={noBorder ? styles.pickerNoBorder : styles.picker}
          zIndex={zIndex}
          zIndexInverse={zIndexInverse}
          open={open}
          value={value}
          items={items}
          onOpen={onOpen}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={placeholder}
          onChangeValue={onSelected}
          // not working if moved to style
          textStyle={{
            fontSize: 17,
            fontFamily: FONTS.SFPro400,
            color: Colors.blackFont,
          }}
          listMode={'SCROLLVIEW'}
          dropDownContainerStyle={
            noBorder ? styles.dropDownNoBorder : styles.dropDown
          }
          arrowIconContainerStyle={showArrow ? {} : {opacity: 0}}
          placeholderStyle={{
            color: placeholderColor,
          }}
        />
        <View style={styles.errorBox}>
          {!!errorText && (
            <>
              <Image
                style={styles.attention}
                source={require('../assets/img/attentionCircle.png')}
              />
              <Text style={styles.errorText}>{errorText}</Text>
            </>
          )}
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontSize: 17,
    fontFamily: FONTS.SFPro400,
    color: Colors._000000,
  },
  dropDown: {
    borderColor: Colors._DBDBDB,
  },
  dropDownNoBorder: {
    borderWidth: 0,
  },
  arrow: {
    opacity: 0,
  },
  pickerLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors._DBDBDB,
    marginBottom: 6,
  },
  modalSelector: {
    width: '100%',
    height: '100%',
  },
  pickerNoBorder: {
    borderWidth: 0,
    marginLeft: -8,
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors._DBDBDB,
  },
  selectorText: {
    textAlign: 'left',
    color: Colors._000000,
  },
  select: {
    borderWidth: 0,
    marginVertical: 6,
    alignItems: 'flex-start',
  },
  optionText: {
    paddingVertical: 10,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    width: 10,
    height: 4,
    marginTop: 16,
  },
  arrowDown: {
    alignSelf: 'flex-end',
  },
  errorText: {
    marginTop: 10,
    fontSize: 11,
    color: Colors._DBDBDB,
  },
  attention: {
    width: 13,
    height: 13,
    marginRight: 4,
    marginTop: 8,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
  },
});
