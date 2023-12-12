import {Flex} from '../../components';
import {Controller, Control, FieldErrors} from 'react-hook-form';
import EditableAvatar from '../../components/Images/EditableAvatar';
import {Text, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ValidationSchema} from './AccountSetupForm';

interface AccountSetupTabCredentialsProps {
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
}: AccountSetupTabCredentialsProps) {
  return (
    <>
      <Flex flex={2} style={Style.inputContainers}>
        <Controller
          control={control}
          name="avatar"
          render={({field: {onChange, value}}) => {
            return (
              <>
                <EditableAvatar source={value} setAvatarPath={onChange} />
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
          name="username"
          render={({field: {onChange, value}}) => (
            <>
              <TextInput value={value} onChangeText={onChange} />
              <Text style={Style.textStyle}>
                {errors.username ? errors.username.message : ''}
              </Text>
            </>
          )}
        />
      </Flex>
      <Flex flex={1} style={Style.inputContainers}>
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, value}}) => (
            <>
              <TextInput value={value} onChangeText={onChange} />
              <Text style={Style.textStyle}>
                {errors.password && errors.password.message}
              </Text>
            </>
          )}
        />
      </Flex>
      <Flex flex={1} style={Style.inputContainers}>
        <Controller
          control={control}
          name="repeatPassword"
          render={({field: {onChange, value}}) => (
            <>
              <TextInput value={value} onChangeText={onChange} />
              <Text style={Style.textStyle}>
                {errors.repeatPassword && errors.repeatPassword.message}
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
