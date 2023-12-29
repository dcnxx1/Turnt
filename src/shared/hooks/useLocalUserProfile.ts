import {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {Role} from '../../models/user';

export type UserStorage = {
  user_id: string;
  username: string;
  role: Role;
};

const storage = new MMKV({
  id: 'user',
  encryptionKey: 'k3XqCrHJR6ib1KZ375gNMj72Gaa3V17YiTcgREIr38baS0zPA5JU1EXACrij',
});

export default function useLocalUserProfile(): {
  user: UserStorage;
  setLocalUser: (user: UserStorage) => void;
  removeLocalUser: () => void;
  isSignedIn: boolean;
  isLoading: boolean;
} {
  const [user, setUser] = useState<UserStorage>({} as UserStorage);
  const [isSignedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const setLocalUser = (user: UserStorage) => {
    storage.set('user', JSON.stringify(user));
    setUser(user);
  };

  const removeLocalUser = () => {
    storage.delete('user');
  };

  useEffect(() => {
    function boot() {
      try {
        const _user = storage.getString('user');

        if (!!_user) {
          console.log('USER MF IS P::>>', _user);
          const localUser: UserStorage = JSON.parse(_user);
          setLocalUser(localUser);
          setSignedIn(!!localUser);
          return;
        }
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    boot();
  }, []);

  useEffect(() => {
    console.log('IS SIGNED IN:>>', isSignedIn);
  }, [isSignedIn]);
  return {user, setLocalUser, removeLocalUser, isSignedIn, isLoading};
}
