import {ReactNode} from 'react';
import {Controller, useForm, ControllerRenderProps} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Flex} from '../../components';
type AccountSetupScreenFormProps = {
  children: ReactNode[];
};
type AccountSetupScreenFormData = {
  profilePicPath: string;
  username: string;
  password: string;
  repeatPassword: string;
  dateOfBirth: string;
  location: string;
};

export default function AccountSetupFormScreen({
  children,
}: AccountSetupScreenFormProps) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<AccountSetupScreenFormData>({
    defaultValues: {
      profilePicPath: '',
      username: '',
      password: '',
      repeatPassword: '',
      dateOfBirth: '',
      location: '',
    },
  });

  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <Flex style={Style.container}>
      <Controller
        rules={{
          maxLength: 25,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            onChange={onChange}
            value={value}
            placeholder="Gebruikersnaam"
          />
        )}
        control={control}
        name="username"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 50,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput value={value} label={'Wachtwoord'} onChange={onChange} />
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 50,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput value={value} label={'Herhaal wachtwoord'} {...onChange} />
        )}
        name="repeatPassword"
      />
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
