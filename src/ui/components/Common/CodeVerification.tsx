import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Colors} from 'app/assets/constants/colors/Colors';

interface IProps {
  onChangeCode: (code: string) => void;
}

const CELL_COUNT = 4;

export const CodeVerification: React.FC<IProps> = props => {
  const {onChangeCode} = props;
  const [value, setValue] = useState('');

  const changeText = (text: string) => {
    setValue(text);
    onChangeCode && onChangeCode(text);
  };

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [cProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <CodeField
      ref={ref}
      {...cProps}
      value={value}
      onChangeText={changeText}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20, alignSelf: 'center', marginBottom: 2},
  cell: {
    width: 60,
    height: 60,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    marginLeft: 3,
    marginRight: 3,
    borderRadius: 8,
    borderColor: Colors._DBDBDB,
    textAlign: 'center',
    padding: 12,
    color: Colors._007AFF,
  },
  focusCell: {
    borderColor: Colors._979797,
    borderWidth: 2,
  },
});
