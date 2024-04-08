import {create} from 'zustand';

type State = {
  isCollapsed: boolean;
  playlistIndex: number;
};


type Actions = {
  setCollapsed: (isCollapsed: boolean) => void;
  expandPlaylistSheet: () => void;
  setPlaylistIndex: (index: number) => void;
  hidePlaylistSheet: () => void;
};

const usePlaylistSheetStore = create<State & Actions>(set => ({
  isCollapsed: true,
  playlistIndex: 0,
  expandPlaylistSheet: () => set({playlistIndex: 1}),
  setPlaylistIndex: (index: number) => set({playlistIndex: index}),
  hidePlaylistSheet: () => set({playlistIndex: -1}),
  setCollapsed: (isCollapsed: boolean) => set({isCollapsed}),
}));

export default usePlaylistSheetStore;
