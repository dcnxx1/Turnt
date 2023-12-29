import {create} from 'zustand';
import {UserStorage} from '../app/boot';

type LocalProfile = {
  user: UserStorage | undefined;
  setUser: (user: UserStorage) => void;
};

const useLocalProfile = create<LocalProfile>(set => ({
  user: undefined,
  setUser: (user: UserStorage) => set({user}),
}));

export default useLocalProfile;
