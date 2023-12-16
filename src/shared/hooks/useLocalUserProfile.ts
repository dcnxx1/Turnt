import {useState} from 'react';
import {MMKV} from 'react-native-mmkv';
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

  const getUser = (): UserStorage => {
    const myAccountInfo = storage.getString('user') ?? '';
    const parsedUser = JSON.parse(myAccountInfo);
    return parsedUser as UserStorage;
  };

  const user = storage.getString('user') ?? '';
  const me = JSON.parse(user) as unknown as UserStorage;

  return {
    profile: getUser(),
    setLocalUserProfile,
  };
}
