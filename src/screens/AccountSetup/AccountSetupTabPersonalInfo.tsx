import {Text, TextInput} from 'react-native-paper';
import {Flex} from '../../components';
import {Control, FieldErrors, Controller} from 'react-hook-form';
import {TCreateAccountFields} from './AccountSetupForm';
import {StyleSheet} from 'react-native';
import DatePicker from '../../components/Misc/DatePicker';
import {useState} from 'react';

interface AccountSetupTabPersonalInfoProps {
  control: Control<{
    avatar: string;
    username: string;
    password: string;
    repeatPassword: string;
    birthday: Date;
    location: string;
  }>;
  errors: FieldErrors<TCreateAccountFields>;
}

export default function AccountSetupTabCredentials({
  control,
  errors,
}: AccountSetupTabPersonalInfoProps) {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const handleShowDatePicker = () => {
    setIsOpenDatePicker(!isOpenDatePicker);
  };

  return (
    <Flex style={Style.container}>
      <Flex flex={2} style={Style.inputContainerLocation}>
        <Controller
          control={control}
          name="location"
          render={({field: {onChange, value}}) => {
            return (
              <>
                <TextInput value={value} onChange={onChange} />
                <Text style={Style.textStyle}>
                  {errors.avatar ? errors.avatar.message : ''}
                </Text>
              </>
            );
          }}
        />
      </Flex>
      <Flex flex={1} style={Style.inputContainers}>
        <Controller
          control={control}
          name="birthday"
          render={({field: {onChange, value}}) => (
            <>
              <TextInput
                editable={false}
                onPressIn={handleShowDatePicker}
                label={'Geboortedatum'}
              />
              <DatePicker
                onClose={handleShowDatePicker}
                isOpen={isOpenDatePicker}
                date={value}
                onChange={onChange}
              />
              <Text style={Style.textStyle}>
                {errors.username ? errors.username.message : ''}
              </Text>
            </>
          )}
        />
      </Flex>
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'white',
  },
  inputContainerLocation: {
    justifyContent: 'flex-end',
  },
  inputContainers: {
    borderWidth: 2,
    alignContent: 'flex-end',
  },
  textStyle: {
    color: 'white',
    alignSelf: 'center',
  },
});
