import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import SkeletonScreen, {
  withLinearGradient,
} from '../../components/SkeletonScreen/SkeletonScreen';
import theme from '../../theme';
import {Flex} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AccountSetupParams} from '../../nav/navparams';
import {useState} from 'react';
import useFindCode from '../../shared/hooks/useFindCode';

const LinearGradientScreen = withLinearGradient(SkeletonScreen);

export default function AuthScreen() {
  const navigation = useNavigation<StackNavigationProp<AccountSetupParams>>();
  const [authCode, setAuthCode] = useState<string>('');
  const {refetch} = useFindCode(authCode);

  const onPressNext = async () => {
    const {data: codeIdentity} = await refetch();
    if (codeIdentity && 'code' in codeIdentity) {
      navigation.navigate('AccountSetupScreen', codeIdentity);
    }
  };

  const onChangeText = (value: string) => {
    setAuthCode(value);
  };

  const content = (
    <>
      <Flex style={Style.contentContainer}>
        <Text style={Style.text}>
          Voer hieronder de code in die u heeft gekregen om verder te gaan.
        </Text>
        <TextInput
          value={authCode}
          onChangeText={onChangeText}
          style={Style.textInput}
          label={'Code'}
          placeholder="TRN - 225TRT"
        />
      </Flex>
      <Flex>
        <Text style={Style.text}>
          De code kan je hergebruiken om in te loggen.
        </Text>

        <Button
          onPress={onPressNext}
          style={Style.button}
          textColor={theme.color.white}>
          Doorgaan
        </Button>
      </Flex>
    </>
  );

  return (
    <LinearGradientScreen
      hasSafeAreaInsets
      style={Style.container}
      gradient={[theme.color.turner, theme.color.turnerPurpleBright]}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: 'white',
  },
  textInput: {
    width: '90%',
  },
  text: {
    color: theme.color.white,
    fontSize: 18,
  },
  button: {
    width: '50%',
    borderColor: theme.color.white,
    borderWidth: 2,
  },
});
