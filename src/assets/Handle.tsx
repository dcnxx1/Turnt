import {StyleSheet, View} from 'react-native';
import theme from '../theme';

type Props = {
  width: number;
};
export default function Handle({width}: Props) {
  return <View style={[style.container, {width}]}></View>;
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#00000000',
    borderWidth: 5,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderRadius: 4,
    borderColor: theme.color.turner,
    width: 75,
    height: 55,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
