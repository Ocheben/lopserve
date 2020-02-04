import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import MonthPicker from 'react-native-month-picker';
import { colors, SText } from './styledComponents';

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: 'white',
    paddingVertical: 5,
    // paddingHorizontal: 20,
    borderWidth: 0,
    borderColor: '#444444',
    borderRadius: 5,
    width: '100%',
    // marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 70,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    color: '#ffffff',
    borderWidth: 0.5,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function MonthPickerModal({placeholder, setDate, selectedDate}) {
  const [isOpen, toggleOpen] = useState(false);
  const [value, onChange] = useState(selectedDate);
  const handleChange = date => {
    onChange(date);
    setDate(date);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleOpen(true)} style={styles.input}>
        <Text style={styles.inputText}>
          {value ? moment(value).format('MMM YYYY') : placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={isOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <MonthPicker
              selectedDate={value || new Date()}
              onMonthChange={handleChange}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => toggleOpen(false)}>
              <SText color="#ffffff" size="14px">Confirm</SText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

MonthPickerModal.defaultProps = {
  placeholder: 'Select date',
};

export default React.memo(MonthPickerModal);
