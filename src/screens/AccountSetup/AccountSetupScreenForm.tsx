import {ReactNode, useState} from 'react';
import {Controller, useForm, ControllerRenderProps} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {Flex} from '../../components';
import DatePicker from '../../components/Misc/DatePicker';
import theme from '../../theme';
import {Role} from '../../models/user';
import EditableAvatar from '../../components/Images/EditableAvatar';

interface AccounSetupFormScreenProps {
  code: string;
  role: Role;
}

export type AccountSetupScreenFormData = {
  profilePicPath: string;
  username: string;
  password: string;
  repeatPassword: string;
  dateOfBirth: Date;
  location: string;
};

export default function AccountSetupScreenForm({
  code,
  role,
}: AccounSetupFormScreenProps) {
  const [isOpenDatePickerModal, setIsOpenDatePickerModal] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<AccountSetupScreenFormData>({
    defaultValues: {
      profilePicPath: '',
      username: '',
      password: '',
      repeatPassword: '',
      dateOfBirth: new Date(),
      location: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return (
    <Flex style={Style.container}>
      <Controller
        control={control}
        rules={{
          validate: (picPath: string) => {
            return !picPath.length;
          },
        }}
        render={({field: {onChange, value}}) => (
          <View style={Style.inputContainer}>
            <EditableAvatar
              size={120}
              source={value}
              handleOnAvatarChange={onChange}
            />
            <Text>{errors.profilePicPath && 'Kies een profielfoto'}</Text>
          </View>
        )}
        name="profilePicPath"
      />
      <Controller
        rules={{
          maxLength: 25,
        }}
        render={({field: {onChange, value}}) => (
          <Flex style={Style.inputContainer}>
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder="Gebruikersnaam"
            />
          </Flex>
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
          <Flex style={Style.inputContainer}>
            <TextInput
              value={value}
              label={'Wachtwoord'}
              secureTextEntry
              textContentType={'password'}
              onChangeText={onChange}
            />
          </Flex>
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          maxLength: 50,
          required: true,
          validate: (repeatPassValue: string) => {
            return repeatPassValue !== watch('password')
              ? 'Wachtwoorden moeten overeenkomen'
              : undefined;
          },
        }}
        render={({field: {onChange, value}}) => (
          <Flex style={Style.inputContainer}>
            <TextInput
              secureTextEntry
              textContentType="password"
              value={value}
              label={'Herhaal wachtwoord'}
              onChangeText={onChange}
            />
            <Text style={{color: 'white'}}>
              {errors.repeatPassword && 'Wachtwoorden moeten overeen komen'}
            </Text>
          </Flex>
        )}
        name="repeatPassword"
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Flex style={Style.inputContainer}>
            <TextInput
              textColor={theme.color.turnerDark}
              onPressIn={() => setIsOpenDatePickerModal(!isOpenDatePickerModal)}
              value={value.toLocaleDateString()}
              editable={false}
            />
            <DatePicker
              isOpen={isOpenDatePickerModal}
              date={value}
              onChange={onChange}
            />
          </Flex>
        )}
        name="dateOfBirth"
      />
      <Button style={Style.button} onPress={onSubmit}>
        <Text style={Style.text}>Voltooien</Text>
      </Button>
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {},
  inputContainer: {
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    color: theme.color.white,
  },
});
