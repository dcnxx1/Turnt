import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, SubmitHandler, SubmitErrorHandler} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {Button} from 'react-native-paper';
import {z} from 'zod';
import {Flex} from '../../components';
import AccountSetupTabCredentials from './AccountSetupTabCredentials';
import AccountSetupTabPersonalInfo from './AccountSetupTabPersonalInfo';
import {useEffect, useState} from 'react';

export interface ValidationSchema {
  avatar: string;
  username: string;
  password: string;
  repeatPassword: string;
  birthday: Date;
  location: string;
}

const schema = z
  .object({
    avatar: z.string({
      errorMap: issue => {
        return {message: 'Kies een profile foto'};
      },
    }),
    username: z
      .string({
        errorMap: (issue, ctx) => {
          return {message: 'Veld mag niet leeg zijn'};
        },
      })
      .min(3, 'Gebruikersnaam moet minstens 3 karakters bevatten'),
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
    location: z.string(),
  })
  .refine(data => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'Wachtwoorden zijn niet hetzelfde',
  });

type ValidationSchemaType = z.infer<typeof schema>;

type HandlerValidatinoSchema = {
  [P in keyof ValidationSchemaType]: ValidationSchemaType[P];
};

type AccountSetupScreenFormProps = {
  onSubmit: (onValid: any, onInvalid: any) => void;
};

export default function AccountSetupForm({
  onSubmit,
}: AccountSetupScreenFormProps) {
  const [isAtEndOfForm, setAtEndOfForm] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    unregister,
    formState: {errors, isValid, isDirty},
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      avatar: '',
      username: '',
      password: '',
      repeatPassword: '',
      birthday: new Date(),
      location: '',
    },
  });

  useEffect(() => {
    if (isAtEndOfForm) {
      register('location');
      register('birthday');
    } else {
      unregister(['location', 'birthday']);
    }
  }, [isAtEndOfForm, register]);

  const onPressSendCredentials: SubmitHandler<ValidationSchemaType> = (data) => {
    console.log("data reiced ->", data)
  } 

  useEffect(() => {
    console.log("errors", errors)
  }, [errors])
  const handleOnPress = () => {
    handleSubmit(onPressSendCredentials)()
  };

  return (
    <>
      <PagerView scrollEnabled={false} initialPage={0} style={Style.pagerView}>
        <Flex key={1}>
          <AccountSetupTabCredentials errors={errors} control={control} />
        </Flex>
        <Flex key={2}>
          <AccountSetupTabPersonalInfo control={control} errors={errors} />
        </Flex>
      </PagerView>

      <View>
        <Button onPress={handleOnPress} style={Style.button}>
          Volgende
        </Button>
      </View>
    </>
  );
}

const Style = StyleSheet.create({
  pagerView: {
    flex: 2,
  },
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
});
