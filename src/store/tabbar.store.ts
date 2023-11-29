import {create} from 'zustand';

type Tabbar = {
  tabbarHeight: number;

  setTabbarHeight: (height: number) => void;
};

const useTabbarStore = create<Tabbar>()(set => ({
  tabbarHeight: 0,

  setTabbarHeight: (height: number) => set({tabbarHeight: height}),
}));

export default useTabbarStore;
