import {StyleSheet} from 'react-native';
import RNDatePicker from 'react-native-date-picker';

type DatePickerProps = {
  date: Date;
  onChange: (date: Date) => void;
  isOpen: boolean;
};
export default function DatePicker({date, onChange, isOpen}: DatePickerProps) {
  const onCancel = (): void => {};

  return (
    <RNDatePicker
      title={'Geboortedatum'}
      cancelText="Annuleren"
      confirmText="Kies"
      modal
      onCancel={onCancel}
      open={isOpen}
      theme={'dark'}
      mode={'date'}
      onConfirm={onChange}
      date={date}
    />
  );
}
