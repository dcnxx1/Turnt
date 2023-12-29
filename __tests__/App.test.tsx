import {MMKV} from 'react-native-mmkv';

describe('Test STore', () => {
  let storage: MMKV;

  beforeAll(() => {
    storage = new MMKV();
  });

  it('sets string value to store', () => {
    const userArr = {
      username: 'Wow',
      age: 25,
      rating: 5,
    };
    storage.set('user', JSON.stringify(userArr));
    expect(storage.getString('user')).toBeDefined()
  });
});
