import {Flex} from '../../components';
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetError,
} from 'react-hook-form';
import EditableImage from '../../components/Images/EditableImage';
import {Text, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {TCreateAccountFields} from './AccountSetupForm';
import findUsername from '../../api/findUsername';

interface AccountSetupTabCredentialsProps {
  control: Control<{
    avatar: string;
    username: string;
    password: string;
    repeatPassword: string;
    birthday: Date;
    location: string;
  }>;
  errors: FieldErrors<TCreateAccountFields>;
  isSubmitted: boolean;
}

export default function AccountSetupTabCredentials({
  control,
  errors,
  isSubmitted,
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
                <EditableImage
                  defaultCover={require('../../assets/covers/cover_brown_default.png')}
                  source={value}
                  isAvatar={true}
                  setSource={onChange}
                />
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
              <TextInput
                label={'Gebruikersnaam'}
                value={value}
                onChangeText={onChange}
              />
              <Text style={Style.textStyle}>
                {errors.username?.message ? errors.username.message : ''}
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
              <TextInput
                clearTextOnFocus={
                  isSubmitted && (!errors.password?.message?.length ?? true)
                }
                autoCapitalize={'none'}
                secureTextEntry
                label={'Wachtwoord'}
                value={value}
                onChangeText={onChange}
              />
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
              <TextInput
                autoCapitalize={'none'}
                secureTextEntry
                label={'Herhaal Wachtwoord'}
                value={value}
                onChangeText={onChange}
              />
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
