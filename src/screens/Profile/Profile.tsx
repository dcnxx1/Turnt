import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {HomeParams} from '../../nav/navparams';
import theme from '../../theme';
export default function Profile(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<HomeParams>>();
  const onPressNavigateEditor = () => {
    navigation.navigate('EditorStack');
  };

  return (
    <View style={Style.container}>
      <Button onPress={onPressNavigateEditor}>Go to Editor</Button>
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    height: '100%',
    width: ' 100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.turnerDark,
  },
});
