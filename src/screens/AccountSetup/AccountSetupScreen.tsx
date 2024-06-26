import {RouteProp, useRoute} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Flex, SkeletonScreen} from '../../components';
import {withLinearGradient} from '../../components/Screen/SkeletonScreen';
import {AccountSetupParams} from '../../nav/navparams';

import theme from '../../theme';
import AccountSetupForm, {TCreateAccountFields} from './AccountSetupForm';
import useCreateAccount from './hooks/useCreateAccount';
import {setLocalUserProfile} from '../../app/boot';

const LinearGradientSkeletonScreen = withLinearGradient(SkeletonScreen);

export default function AccountSetupScreen() {
  const route = useRoute<RouteProp<AccountSetupParams, 'AccountSetupScreen'>>();
  const createAccountMutation = useCreateAccount();

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
              setLocalUserProfile(createdUserResponse);
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
      contentStyle={Style.container}
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
