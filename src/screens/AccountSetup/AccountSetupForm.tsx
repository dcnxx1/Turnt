import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {z} from 'zod';
import {Flex} from '../../components';
import EditableAvatar from '../../components/Images/EditableAvatar';
import DatePicker from '../../components/Misc/DatePicker';
import useFindUsername from './hooks/useFindUsername';

export interface ValidationSchema {
  avatar: string;
  username: string;
  password: string;
  repeatPassword: string;
  birthday: Date;
}

const schema = z
  .object({
    avatar: z.string().min(2, 'Kies een profiel foto'),
    username: z
      .string({
        errorMap: (issue, ctx) => {
          console.log(issue);
          return {message: 'Veld mag niet leeg zijn'};
        },
      })
      .min(3, 'Gebruikersnaam moet minstens 3 karakters bevatten')
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message:
          'Gebruikersnaam mag geen speciale karakters bevatten (alleen _ of -)',
      }),
    password: z
      .string({
        errorMap: (issue, ctx) => {
          return {message: 'Veld mag niet leeg zijn'};
        },
      })
      .min(5, {message: 'Wachtwoord moet minstens 5 karakters bevatten'})
      .max(20, {message: 'Wachtwoord mag maximaal 20 karakters bevatten'}),
    repeatPassword: z.string({
      errorMap: (issue, ctx) => {
        return {message: 'Veld mag niet leeg zijn'};
      },
    }),
    birthday: z.date(),
  })
  .refine(data => data.password.trim() === data.repeatPassword.trim(), {
    path: ['repeatPassword'],
    message: 'Wachtwoorden zijn niet hetzelfde',
  });

type ValidationSchemaType = z.infer<typeof schema>;

type AccountSetupScreenFormProps = {
  onSubmit: (onValid: any, onInvalid: any) => void;
};

export default function AccountSetupForm({
  onSubmit,
}: AccountSetupScreenFormProps) {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const handleShowDatePicker = () => {
    setIsOpenDatePicker(!isOpenDatePicker);
  };
  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: {errors, isSubmitted, isSubmitting},
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      avatar: '',
      username: '',
      password: '',
      repeatPassword: '',
      birthday: new Date(),
    },
  });

  const [oldUsername, setOldUsername] = useState('');

  const username = watch('username');
  const {refetch} = useFindUsername(username);

  const handleOnPressNext = async (): Promise<void> => {
    if (username !== oldUsername) {
      const {data: doesUsernameAlreadyExist} = await refetch();
      setOldUsername(username);
      if (doesUsernameAlreadyExist) {
        setError('username', {
          message: 'Gebruikersnaam bestaat al',
        });
        return;
      }

      clearErrors('username');
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Flex>
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
      <Flex>
        <Controller
          name="birthday"
          control={control}
          render={({field: {onChange, value}}) => (
            <>
              <TextInput
                onPressIn={handleShowDatePicker}
                value={value.toLocaleDateString()}
                editable={false}
                label={'Geboortedatum'}
              />
              <Text style={Style.textStyle}>
                {errors.birthday && errors.birthday.message}
              </Text>
              <DatePicker
                onChange={onChange}
                onClose={handleShowDatePicker}
                isOpen={isOpenDatePicker}
              />
            </>
          )}
        />
      </Flex>

      <Flex>
        <Button
          disabled={isSubmitting}
          onPress={handleOnPressNext}
          style={Style.button}>
          Volgende
        </Button>
      </Flex>
    </Flex>
  );
}

const Style = StyleSheet.create({
  pagerView: {
    flex: 2,
  },
  tabContainer: {},
  input: {
    width: '90%',
  },
  avatar: {
    justifyContent: 'flex-end',
  },
  button: {
    widht: '90%',
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    alignSelf: 'center',
  },
  inputContainers: {
    justifyContent: 'center',
  },
});
