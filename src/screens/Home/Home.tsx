import {Dimensions, View} from 'react-native';

export default function Home(): JSX.Element {
  console.log('home rendered lawl');
  return (
    <View
      style={{
        flex: 1,
        height: Dimensions.get('screen').height,
        width: '100%',

        backgroundColor: 'green',
      }}></View>
  );
}
