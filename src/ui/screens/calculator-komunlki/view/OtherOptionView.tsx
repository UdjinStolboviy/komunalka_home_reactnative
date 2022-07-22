import {Colors} from 'app/assets/constants/colors/Colors';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {OtherOptionElement} from './OtherOptionElement';
export interface OtherOptionViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  onResultOther: (result: number) => void;
  unitOfMeasurement?: string;
}

export const OtherOptionView = (props: OtherOptionViewProps) => {
  const [addOther, setAddOther] = useState([1]);
  const [subtractOther, setSubtractOther] = useState([1]);
  const [addOtherValue, setAddOtherValue] = useState<number[]>([0]);
  const [subtractOtherValue, setSubtractOtherValue] = useState<number[]>([0]);

  useEffect(() => {
    calculateVale();
  }, [addOtherValue, subtractOtherValue]);

  const calculateVale = () => {
    const addOtherResult = addOtherValue.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    const subtractOtherResult = subtractOtherValue.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return (
      props.onResultOther &&
      props.onResultOther(addOtherResult - subtractOtherResult)
    );
  };

  const renderOtherAdd = () => {
    return addOther.map((item, index) => {
      return (
        <OtherOptionElement
          key={index}
          type={'add'}
          onInputChange={text => {
            const untilAddOtherValue = addOtherValue.splice(0, index + 1);
            const afterAddOtherValue = addOtherValue.splice(
              index + 1,
              addOtherValue.length,
            );
            const newAddOtherValue = [
              ...untilAddOtherValue,
              text,
              ...afterAddOtherValue,
            ];
            setAddOtherValue([...newAddOtherValue]);
          }}
          onReturnAdd={text => {
            if (text === 'add') {
              setAddOther([...addOther, addOther.length + 1]);
            }
          }}
          onReturnRemove={text => {
            if (text === 'add') {
              setAddOther(addOther.splice(-1, 1));
              setAddOtherValue(addOtherValue.splice(-1, 1));
            }
          }}
        />
      );
    });
  };
  const renderOtherSubtract = () => {
    return subtractOther.map((item, index) => {
      return (
        <OtherOptionElement
          key={index}
          type={'subtract'}
          onInputChange={text => {
            const untilSubtractOtherValue = subtractOtherValue.splice(
              0,
              index + 1,
            );
            const afterSubtractOtherValue = subtractOtherValue.splice(
              index + 1,
              subtractOtherValue.length,
            );
            const newSubtractOtherValue = [
              ...untilSubtractOtherValue,
              text,
              ...afterSubtractOtherValue,
            ];
            setSubtractOtherValue([...newSubtractOtherValue]);
          }}
          onReturnAdd={text => {
            if (text === 'subtract') {
              setSubtractOther([...subtractOther, subtractOther.length + 1]);
            }
          }}
          onReturnRemove={text => {
            if (text === 'subtract') {
              setSubtractOther(subtractOther.splice(-1, 1));
              setSubtractOtherValue(subtractOtherValue.splice(-1, 1));
            }
          }}
        />
      );
    });
  };
  return (
    <View style={[styles.container, props.containerStyle]}>
      {renderOtherAdd()}
      {renderOtherSubtract()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
