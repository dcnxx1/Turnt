import {Dimensions, Text, View} from 'react-native';

export default function Editor(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: 'green',
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>Yo</Text>
    </View>
  );
}
