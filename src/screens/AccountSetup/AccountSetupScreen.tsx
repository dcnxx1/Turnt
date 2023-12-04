import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Flex, SkeletonScreen} from '../../components';
import Avatar from '../../components/Images/Avatar';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import theme from '../../theme';
import EditableAvatar from '../../components/Images/EditableAvatar';
import {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import AccountSetupFormScreen from './AccountSetupFormScreen';

const LinearGradientSkeletonScreen = withLinearGradient(SkeletonScreen);

export default function AccountSetupScreen() {
  const [source, setSource] = useState('');
  const [name, setName] = useState('');
  const handleOnAvatarChange = (croppedImage: string) => {
    setSource(croppedImage);
  };
  const handleOnChangeName = (text: string) => {
    setName(text);
  };
  const header = (
    <Flex style={Style.container}>
      <Text style={Style.text}>Profiel Aanmaken</Text>
    </Flex>
  );

  const content = (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={48}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={Style.keyboardAvoidViewStyle}>
        <Flex style={Style.container}>
          <AccountSetupFormScreen>
            <EditableAvatar
              handleOnAvatarChange={handleOnAvatarChange}
              source={source}
              size={150}
            />

            <TextInput
              value={name}
              label={'Gebruikersnaam'}
              style={Style.input}
              onChangeText={handleOnChangeName}
            />
            <TextInput
              value={name}
              label={'Wachtwoord'}
              style={Style.input}
              onChangeText={handleOnChangeName}
            />
            <TextInput
              value={name}
              label={'Herhaal wachtwoord'}
              style={Style.input}
              onChangeText={handleOnChangeName}
            />
            <TextInput
              value={name}
              label={'Locatie'}
              style={Style.input}
              onChangeText={handleOnChangeName}
            />
          </AccountSetupFormScreen>
        </Flex>
      </KeyboardAvoidingView>
    </>
  );

  const footer = (
    <Button textColor={theme.color.white} style={Style.button}>
      Voltooien
    </Button>
  );

  return (
    <LinearGradientSkeletonScreen
      header={header}
      content={content}
      footer={footer}
      hasSafeAreaInsets
      gradient={[theme.color.turner, theme.color.turnerPurpleBright]}
      footerStyle={Style.footerStyle}
      style={Style.container}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 35,
  },
  text: {
    color: theme.color.white,
    fontSize: 24,
  },
  button: {
    borderWidth: 2,
    borderColor: 'white',
    width: '90%',
  },
  footerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
  },
  keyboardAvoidViewStyle: {
    width: '90%',
    flex: 1,
  },
});
