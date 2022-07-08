import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Image,
  TextInputProps,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Text} from '../../components/Common/Text';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {
  localizationContext,
  LocalizationContext,
} from 'app/localization/localizationProvider';
import {Colors} from 'app/assets/constants/colors/Colors';

interface IProps extends TextInputProps {
  title?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  datePicked?: (date: Date) => void;
  dateString?: string;
  noBorder?: boolean;
  setDateError?: Dispatch<SetStateAction<string>>;
}
const defaultDate = moment().subtract(16, 'years').subtract(1, 'days').toDate();
export const FormDateInput: React.FC<IProps> = props => {
  const {datePicked, errorText, title, noBorder, dateString, setDateError} =
    props;
  const {translate} = useContext<LocalizationContext>(localizationContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (dateString) {
      const initDate = moment(dateString, 'DD-MM-YYYY').toDate();
      setDate(initDate);
    }
  }, [dateString]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const validDate: Date =
      date.getTime() / 1000 > defaultDate.getTime() / 1000 ? defaultDate : date;

    if (setDateError) {
      setDateError('');
    }
    hideDatePicker();
    setDate(validDate);
    datePicked && datePicked(validDate);
  };

  const getContent = () => {
    if (date) {
      return (
        <>
          <Text isSFP normal style={styles.text1}>
            {moment(date).format('DD')}
          </Text>
          <View style={styles.divider} />
          <Text isSFP normal style={styles.text2}>
            {moment(date).format('MMMM')}
          </Text>
          <View style={styles.divider} />
          <Text isSFP normal style={styles.text3}>
            {moment(date).format('YYYY')}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text isSFP normal style={styles.placeholderText1}>
            {'Main_Day'}
          </Text>
          <View style={styles.divider} />
          <Text isSFP normal style={styles.placeholderText2}>
            {'Main_Month'}
          </Text>
          <View style={styles.divider} />
          <Text isSFP normal style={styles.placeholderText3}>
            {'Main_Year'}
          </Text>
        </>
      );
    }
  };

  return (
    <View style={noBorder ? styles.borderlessContainer : styles.container}>
      {!!title && (
        <Text isSFP={true} normal={true} style={styles.title}>
          {title}
        </Text>
      )}
      <TouchableOpacity
        onPress={showDatePicker}
        style={
          noBorder ? styles.borderlessInputContainer : styles.inputContainer
        }>
        {getContent()}
        {noBorder ? null : (
          <Image
            style={styles.calendarIcon}
            source={require('../assets/img/calendarIcon.png')}
          />
        )}
      </TouchableOpacity>

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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date('1910-01-01')}
        maximumDate={defaultDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
