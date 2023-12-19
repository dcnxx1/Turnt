import {create} from 'zustand';
import {useShallow} from 'zustand/react/shallow';
import {TestData} from '../screens/Home/HomeScreen';

type ActiveTurn = {
  activeTurn: TestData;
  setActiveTurn: (turn: TestData) => void;
};

 const useActiveTurn = create<ActiveTurn>(set => ({
  activeTurn: {} as TestData,
  setActiveTurn: (turn: TestData) => set({activeTurn: turn}),
}));

export default useActiveTurn