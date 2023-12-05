import {RouteProp, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Flex, SkeletonScreen} from '../../components';
import EditableAvatar from '../../components/Images/EditableAvatar';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {AccountSetupParams} from '../../nav/navparams';
import theme from '../../theme';
import AccountSetupScreenForm from './AccountSetupScreenForm';

const LinearGradientSkeletonScreen = withLinearGradient(SkeletonScreen);

export default function AccountSetupScreen() {
  const [profilePicSource, setProfilePicSource] = useState('');
  const route = useRoute<RouteProp<AccountSetupParams, 'AccountSetupScreen'>>();

  const handleOnAvatarChange = (croppedImage: string) => {
    setProfilePicSource(croppedImage);
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
          <AccountSetupScreenForm
            role={route.params.role}
            code={route.params.code}
            
          />
        </Flex>
      </KeyboardAvoidingView>
    </>
  );

  return (
    <LinearGradientSkeletonScreen
      header={header}
      content={content}
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

  footerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
  },
  keyboardAvoidViewStyle: {
    width: '95%',
    flex: 1,
  },
});
