import {Dimensions, StyleSheet, View} from 'react-native';

const FOOTER_HEIGHT = Dimensions.get('screen').height * 0.1;

export default function FlashlistFooterComponent() {
  return <View style={Style.container}></View>;
}

const Style = StyleSheet.create({
  container: {
    height: FOOTER_HEIGHT,
    width: '100%',
    backgroundColor: '#00000000',
    borderWidth: 2,
    borderColor: 'red',
  },
});
