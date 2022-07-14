import testIDs from 'app/assets/constants/codes/testIDs';
import moment from 'moment';
import React, {
  useState,
  Fragment,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {StyleSheet, ScrollView, Text, StyleProp, ViewStyle} from 'react-native';
import {Calendar} from 'react-native-calendars';

export interface CalendarScreenProps {
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (value: string) => void;
}

const CalendarScreen = (props: CalendarScreenProps) => {
  const INITIAL_DATE = moment(new Date()).format('YYYY-MM-DD');
  const [selected, setSelected] = useState(INITIAL_DATE);

  //   const [date, setDate] = useState<Date>();
  //   const dd = moment(new Date()).format('DD');
  //   const mm = moment(new Date()).format('MMMM');
  //   const yyy = moment(new Date()).format('YYYY');

  useEffect(() => {
    if (selected) {
      props.onChange && props.onChange(selected);
    }
  }, [selected]);

  const onDayPress = useCallback(day => {
    setSelected(day.dateString);
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
        selectedTextColor: 'red',
      },
      ['2022-07-22']: {
        dotColor: 'red',
        marked: true,
      },
      '2022-07-08': {
        selected: true,
        dots: [
          {key: 'vacation', color: 'blue', selectedDotColor: 'red'},
          {key: 'massage', color: 'red', selectedDotColor: 'white'},
        ],
      },
      '2022-07-09': {
        disabled: true,
        dots: [
          {key: 'vacation', color: 'green', selectedDotColor: 'red'},
          {key: 'massage', color: 'red', selectedDotColor: 'green'},
        ],
      },
    };
  }, [selected]);

  const renderCalendarWithMultiDotMarking = () => {
    return (
      <Fragment>
        <Text style={styles.text}>{selected}</Text>
        <Calendar
          testID={testIDs.calendars.FIRST}
          style={styles.calendar}
          current={INITIAL_DATE}
          markingType={'multi-dot'}
          onDayPress={onDayPress}
          markedDates={marked}
        />
      </Fragment>
    );
  };

  const renderExamples = () => {
    return <Fragment>{renderCalendarWithMultiDotMarking()}</Fragment>;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      testID={testIDs.calendars.CONTAINER}>
      {renderExamples()}
    </ScrollView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  switchText: {
    margin: 10,
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  disabledText: {
    color: 'grey',
  },
  defaultText: {
    color: 'purple',
  },
  customCalendar: {
    height: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  customDay: {
    textAlign: 'center',
  },
  customHeader: {
    backgroundColor: '#FCC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: -4,
    padding: 8,
  },
  customTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  customTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BBF2',
  },
});
