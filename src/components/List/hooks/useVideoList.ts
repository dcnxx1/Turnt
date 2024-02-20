import {useRef} from 'react';
import {ITurn} from '../../../models/turn';
import {ViewToken} from '@shopify/flash-list';
import {useDispatch} from 'react-redux';
import {
  setActiveVideo,
  setListIndex,
} from '../../../redux/listSlices/videoManagementSlice';
import {ViewabilityConfig, ViewabilityConfigCallbackPairs} from 'react-native';
import {useActiveTurnStore} from '../../../store';

type UseVideoListReturnType = [
  keyExtractor: (item: ITurn) => string,
  viewablityConfig: React.MutableRefObject<ViewabilityConfig>,
  onViewableItemsChanged: ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => void,
];

export default function useVideoList(): UseVideoListReturnType {
  const dispatch = useDispatch();
  const setActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
  const keyExtractor = (item: ITurn) => {
    return item.turn_id;
  };

  const changedItems = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      console.log('Shit called');
      if (viewableItems.length && viewableItems[0].item !== undefined) {
        const {item, index} = viewableItems[0];
        setActiveTurn({
          duration: item.duration,
        });
        console.log('onviewableItemsChangedCalled :>', item.title);
        dispatch(
          setActiveVideo({
            duration: item.duration,
            video_id: item.turn_id,
          }),
        );
        if (index !== null) {
          dispatch(setListIndex(index));
          console.log('dispatching list index :>>', index);
        }
      }
    },
  );

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    console.log('Shit called');
    if (viewableItems.length && viewableItems[0].item !== undefined) {
      const {item, index} = viewableItems[0];
      setActiveTurn({
        duration: item.duration,
        
      });
      dispatch(
        setActiveVideo({
          duration: item.duration,
          video_id: item.turn_id,
        }),
      );
      if (index !== null) {
        dispatch(setListIndex(index));
      }
    }
  };
  const viewabilityConfig = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
    waitForInteraction: false,

  });

  return [keyExtractor, viewabilityConfig, onViewableItemsChanged];
}
