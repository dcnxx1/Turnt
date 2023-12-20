import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Flex, SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {AccountSetupParams, HomeParams} from '../../nav/navparams';
import theme from '../../theme';
import AccountSetupForm, {TCreateAccountFields} from './AccountSetupForm';
import useCreateAccount from './hooks/useCreateAccount';
import useLocalUserProfile from '../../shared/hooks/useLocalUserProfile';
import {StackNavigationProp} from '@react-navigation/stack';

const LinearGradientSkeletonScreen = withLinearGradient(SkeletonScreen);

export default function AccountSetupScreen() {
  const route = useRoute<RouteProp<AccountSetupParams, 'AccountSetupScreen'>>();
  const navigation = useNavigation<StackNavigationProp<AccountSetupParams>>();
  const createAccountMutation = useCreateAccount();
  const me = useLocalUserProfile();

  const onSubmitCreateAccountWithoutErrors = (
    fieldValues: TCreateAccountFields,
  ) => {
    if (fieldValues) {
      createAccountMutation(
        {
          fieldValues,
          code: route.params.code,
          role: route.params.role,
        },
        {
          onSettled: createdUserResponse => {
            if (createdUserResponse) {
              me.setLocalUserProfile(createdUserResponse);
            }
          },
        },
      );
    }
  };
  const header = (
    <Flex style={Style.container}>
      <Text style={Style.text}>Profiel opzetten</Text>
    </Flex>
  );

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
      styleContent={Style.container}
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
