import {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import HomeScreen from '../../screens/Home/HomeScreen';
import {Profile} from '../../screens';
import {StyleSheet, View} from 'react-native';

export default function Tabbar() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([{key: 'home'}, {key: 'profile'}]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    profile: Profile,
  });

  return (
    <BottomNavigation
      style={Style.container}
      onIndexChange={setIndex}
      renderScene={renderScene}
      navigationState={{index, routes}}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
});
