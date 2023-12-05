import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import SkeletonForm, {
  SkeletonFormInputs,
} from '../../components/Form/SkeletonForm';

interface AccounSetupFormScreenProps {
  onSubmitCreateAccountWithoutErrors: (formData: any) => void;
}

export default function AccountSetupScreenForm({
  onSubmitCreateAccountWithoutErrors,
}: AccounSetupFormScreenProps) {
  const forms: SkeletonFormInputs<any>[] = [
    {
      name: 'username',
      node: (
        <TextInput
          autoCorrect={false}
          scrollEnabled={false}
          style={Style.input}
        />
      ),
      returnErrorWhen: (value: string, watch) =>
        validateInput(value, 'Gebruikersnaam'),
    },
    {
      name: 'password',
      node: <TextInput autoCorrect={false} style={Style.input} />,
      returnErrorWhen: (value: string) => validateInput(value, 'Wachtwoord'),
    },
    {
      name: 'repeat_password',
      node: <TextInput autoCorrect={false} style={Style.input} />,
      returnErrorWhen: (value: string, watch) => {
        const passwordValue = watch('password')
        return areInputsEqual(value, passwordValue);
      },
    },
    {
      name: 'button',
      node: (
        <Button
          onPress={onSubmitCreateAccountWithoutErrors}
          style={Style.button}>
          Volgende
        </Button>
      ),
    },
  ];

  return (
    <SkeletonForm
      onSubmit={onSubmitCreateAccountWithoutErrors}
      style={Style.formStyle}
      forms={forms}
    />
  );
}

const validateInput = (value: string, inputFieldName: string) => {
  if (!value) return `${inputFieldName} mag niet leeg zijn`;
  if (!value.length) return `${inputFieldName} mag niet leeg zijn`;
  if (inputFieldName == 'Herhaal Wachtwoord') return `${inputFieldName}`;
};
const areInputsEqual = (value1: string, value2: string) => {
  return value1 !== value2 ? 'Wachtwoorden moeten overeen komen' : undefined;
};

const Style = StyleSheet.create({
  formStyle: {
    borderWidth: 2,
  },
  button: {
    borderWidth: 2,
    widht: '90%',
    backgroundColor: 'white',
  },
  input: {
    width: '90%',
  },
});
