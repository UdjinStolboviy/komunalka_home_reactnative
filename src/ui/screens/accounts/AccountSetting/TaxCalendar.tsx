import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import {useInjection} from 'inversify-react';
import {observer} from 'mobx-react';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

export interface ICalendarViewProps {
  onClose?: () => void;
  onGetEvents?: (dateStart: number, dataEnd: number) => void;
}
export const TaxCalendar = observer((props: ICalendarViewProps) => {
  const app: IAppCoreService = useAppInjection();
  const dataNow = new Date().getTime();
  const dataNowYear = moment(dataNow).format('YYYY');

  const checkDate = () => {
    const firstDate = moment(`${dataNowYear}-01-05`).valueOf();
    const firstEndDate = moment(`${dataNowYear}-01-20`).valueOf();
    const secondDate = moment(`${dataNowYear}-04-05`).valueOf();
    const secondEndDate = moment(`${dataNowYear}-04-20`).valueOf();
    const theadDate = moment(`${dataNowYear}-07-05`).valueOf();
    const theadEndDate = moment(`${dataNowYear}-07-20`).valueOf();
    const fourthDate = moment(`${dataNowYear}-10-05`).valueOf();
    const fourthEndDate = moment(`${dataNowYear}-10-20`).valueOf();

    let startData = 0;
    let endData = 0;

    if (dataNow <= firstEndDate) {
      startData = firstDate;
      endData = firstEndDate;
    }
    if (dataNow >= firstEndDate && dataNow <= secondDate) {
      startData = secondDate;
      endData = secondEndDate;
    }
    if (dataNow >= secondEndDate && dataNow <= theadDate) {
      startData = theadDate;
      endData = theadEndDate;
    }
    if (dataNow >= theadEndDate && dataNow <= fourthDate) {
      startData = fourthDate;
      endData = fourthEndDate;
    }

    return {startData, endData};
  };

  const createDateRange = (startDate, endDate) => {
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');
    const dateRange = {
      [startDate]: {selected: true, startingDay: true, color: '#1362E1'},
      [endDate]: {selected: true, endingDay: true, color: '#1362E1'},
    };
    if (startDate && endDate) {
      let start = moment(startDate).startOf('day').add(1, 'days');
      const end = moment(endDate).startOf('day');
      while (end.isAfter(start)) {
        Object.assign(dateRange, {
          [start.format('YYYY-MM-DD')]: {selected: true, color: '#1362E1'},
        });
        start = start.add(1, 'days');
      }
    }
    return dateRange;
  };
  const startDateClear = new Date().getTime();
  const endDateClear = moment(startDateClear).add(1, 'years').valueOf();
  return (
    <View style={style.centeredView}>
      <AppHeader />
      <View style={style.modalView}>
        <Text style={style.textTitleCalendar}>Календар податків</Text>
        <View style={style.wrapperCalendar}>
          <Calendar
            // onDayPress={day => {
            //   if (startDate === 0) {
            //     setStartDate(day.timestamp);
            //   } else {
            //     setEndDate(day.timestamp);
            //   }
            // }}
            markingType={'period'}
            markedDates={createDateRange(
              checkDate().startData,
              checkDate().endData,
            )}
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
        </View>

        <TouchableOpacity
          style={style.buttonDone}
          onPress={() => app.navigationService.goBack()}>
          <Text style={style.textButtonDone}>Вийти назад</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const style = StyleSheet.create({
  wrapperCalendar: {
    width: '115%',

    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 13,
  },
  textTitleCalendar: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 25,
    marginTop: 15,
    color: '#1362E1',
  },
  buttonDone: {
    marginTop: 17,
    width: '100%',
    height: 50,
    backgroundColor: '#1362E1',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonDone: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  wrapperButtonApply: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  textButtonTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    color: '#0000',
  },
  textButtonDescription: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#0000',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '100%',
    minHeight: 550,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonClose: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  buttonClear: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  textButtonClear: {
    color: '#1362E1',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
  },
});
