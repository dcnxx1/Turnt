import {create} from 'zustand';

type State = {
  isCollapsed: boolean;
};
type Actions = {
  setCollapsed: (isCollapsed: boolean) => void;
  expandPlaylistSheet: () => void;
};

const usePlaylistSheetStore = create<State & Actions>(set => ({
  isCollapsed: true,
  expandPlaylistSheet: () => set({isCollapsed: true}),
  setCollapsed: (isCollapsed: boolean) => set({isCollapsed}),
}));


export default usePlaylistSheetStore