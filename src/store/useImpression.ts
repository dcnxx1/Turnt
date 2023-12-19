import {create} from 'zustand';

type Impression = {
  isImpression: boolean;
  setImpression: (isImpression: boolean) => void;
};

 const useImpression = create<Impression>(set => ({
  isImpression: true,
  setImpression: (isImpression: boolean) => set({isImpression}),
}));

export default useImpression