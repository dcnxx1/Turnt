import {Text, TextInput} from 'react-native-paper';
import {Flex} from '../../components';
import {Control, FieldErrors, Controller} from 'react-hook-form';
import {ValidationSchema} from './AccountSetupForm';
import {StyleSheet} from 'react-native';
import DatePicker from '../../components/Misc/DatePicker';

interface AccountSetupTabPersonalInfoProps {
  control: Control<{
    avatar: string;
    username: string;
    password: string;
    repeatPassword: string;
    birthday: Date;
    location: string;
  }>;
  errors: FieldErrors<ValidationSchema>;
}

export default function AccountSetupTabCredentials({
  control,
  errors,
}: AccountSetupTabPersonalInfoProps) {
  return (
    <>
      <Flex flex={2} style={Style.inputContainers}>
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
              <DatePicker handleOpenDatePicker={() => null} date={value} onChange={onChange} />
              <Text style={Style.textStyle}>
                {errors.username ? errors.username.message : ''}
              </Text>
            </>
          )}
        />
      </Flex>
    </>
  );
}

const Style = StyleSheet.create({
  inputContainers: {
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    alignSelf: 'center',
  },
});
