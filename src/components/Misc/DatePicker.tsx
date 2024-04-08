import {useMemo} from 'react';
import RNDatePicker from 'react-native-date-picker';

type DatePickerProps = {
  date?: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
  isOpen?: boolean;
  minimumDate?: Date;
};
export default function DatePicker({
  date = new Date(),
  onChange: onConfirm,
  minimumDate = new Date(),
  onClose: onCancel,
  isOpen = false,
}: DatePickerProps) {
  const minDate = useMemo(() => {
    return new Date('2012-12-31 23:59:59');
  }, []);

  return (
    <RNDatePicker
      title={'Kies geboortedatum 🤲🏼'}
      cancelText="Annuleren ❌"
      confirmText="Kies ✅"
      modal
      maximumDate={minDate}
      onCancel={onCancel}
      open={isOpen}
      theme={'dark'}
      mode={'date'}
      onConfirm={onConfirm}
      date={date}
    />
  );
}
