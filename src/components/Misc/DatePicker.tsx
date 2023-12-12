import RNDatePicker from 'react-native-date-picker';

type DatePickerProps = {
  date?: Date;
  onChange: (date: Date) => void;
  isOpen?: boolean;
  handleOpenDatePicker: () => void;
};
export default function DatePicker({
  date = new Date(),
  handleOpenDatePicker,
  onChange: onConfirm,
  isOpen = false,
}: DatePickerProps) {
  const onCancel = (): void => {
    handleOpenDatePicker();
  };

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
      onConfirm={date => {
        onConfirm(date);
        handleOpenDatePicker();
      }}
      date={date}
    />
  );
}
