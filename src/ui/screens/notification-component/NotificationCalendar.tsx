import testIDs from 'app/assets/constants/codes/testIDs';
import {Colors} from 'app/assets/constants/colors/Colors';
import {MarkedNotification} from 'app/models/common/marked.notification';
import {observer} from 'mobx-react';
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

export interface NotificationCalendarViewProps {
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (value: string) => void;
  datesSettlement: string[];
}

const NotificationCalendarView = observer(
  (props: NotificationCalendarViewProps) => {
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

    const markedSettlement = props.datesSettlement;

    const dotsCants = (date: string) => {
      const dot1 = [{color: Colors._34C759}];
      const dot2 = [{color: Colors._34C759}, {color: Colors._F8D1AE}];
      const dot3 = [
        {color: Colors._34C759},
        {color: Colors._F8D1AE},
        {color: Colors._F63535},
      ];
      const dot4 = [
        {color: Colors._34C759},
        {color: Colors._F8D1AE},
        {color: Colors._F63535},
        {color: Colors._FFFFFF},
      ];

      const uniq = markedSettlement
        .map(name => {
          return {count: 1, name};
        })
        .reduce((a: any, b) => {
          a[b.name] = (a[b.name] || 0) + b.count;
          return a;
        }, {});

      if (uniq[date] === 1) {
        return dot1;
      }
      if (uniq[date] === 2) {
        return dot2;
      }
      if (uniq[date] === 3) {
        return dot3;
      }
      if (uniq[date] >= 4) {
        return dot4;
      }

      return dot1;
    };

    const marked = useMemo(() => {
      let marked = {
        [selected]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: 'orange',
          selectedTextColor: 'red',
          dots: dotsCants(selected),
        },
      };
      for (let i = 0; i < markedSettlement.length; i++) {
        const settlement = markedSettlement[i];
        marked[settlement] = {
          selected: true,
          disableTouchEvent: true,
          selectedColor: Colors._007AFF,
          selectedTextColor: 'white',
          dots: dotsCants(settlement),
        };
      }

      return marked;
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
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#13e162',
              dayTextColor: '#1362E1',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#1362E1',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: '#1362E1',
              indicatorColor: 'blue',
              textDayFontWeight: '300',
              textMonthFontWeight: '500',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 17,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 13,
            }}
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
  },
);

export default NotificationCalendarView;

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
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    fontSize: 20,
    color: '#1362E1',
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
