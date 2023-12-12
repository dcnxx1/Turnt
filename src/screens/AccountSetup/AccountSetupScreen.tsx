import {RouteProp, useRoute} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Flex, SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {AccountSetupParams} from '../../nav/navparams';
import theme from '../../theme';
import AccountSetupForm from './AccountSetupForm';

const LinearGradientSkeletonScreen = withLinearGradient(SkeletonScreen);

export default function AccountSetupScreen() {
  const route = useRoute<RouteProp<AccountSetupParams, 'AccountSetupScreen'>>();

  const header = (
    <Flex style={Style.container}>
      <Text style={Style.text}>Profiel Aanmaken</Text>
    </Flex>
  );

  const onSubmitCreateAccountWithoutErrors = (onValid : any, onInvalid: any) => {
    console.log("on submit called:D")
  };

  const content = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Style.keyboardAvoidViewStyle}>
      <AccountSetupForm onSubmit={onSubmitCreateAccountWithoutErrors} />
    </KeyboardAvoidingView>
  );

  return (
    <LinearGradientSkeletonScreen
      header={header}
      content={content}
      hasSafeAreaInsets
      gradient={[theme.color.turner, theme.color.turnerPurpleBright]}
      style={Style.container}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: theme.color.white,
    fontSize: 24,
  },

  footerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  keyboardAvoidViewStyle: {
    width: '95%',
    flex: 1,
  },
});
