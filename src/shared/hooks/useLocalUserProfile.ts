import {MMKV} from 'react-native-mmkv';
import {Prettify} from '../../helpers';
import {Role} from '../../models/user';

type UserStorage = {
  user_id: string;
  username: string;
  role: Role;
};

const storage = new MMKV({
  id: 'user',
  encryptionKey: 'k3XqCrHJR6ib1KZ375gNMj72Gaa3V17YiTcgREIr38baS0zPA5JU1EXACrij',
});

export default function useLocalUserProfile() {
  const setLocalUserProfile = (user: UserStorage) => {
    storage.set('user', JSON.stringify(user));
  };

  const getUser = (): Prettify<UserStorage> => {
    const user = storage.getString('user') ?? '';
    const parsedUser = user.length ? JSON.parse(user) : '';
    return parsedUser;
  };

  return {
    profile: getUser(),
    setLocalUserProfile,
  };
}
