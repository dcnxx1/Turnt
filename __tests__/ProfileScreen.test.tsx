import renderer from 'react-test-renderer';

import ProfileScreen from '../src/screens/Profile/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
describe('ProfileScreen', () => {
  test('navigation is Defined', () => {
    const profileScreenTree = renderer
      .create(
        <NavigationContainer>
          <ProfileScreen />
        </NavigationContainer>,
      )
      .toJSON();
    expect(profileScreenTree).toBeDefined();
  });
});
