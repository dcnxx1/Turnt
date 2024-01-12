import {ViewToken} from '@shopify/flash-list';
import {useDispatch} from 'react-redux';
import {ITurn} from '../../../models/turn';
import {setIndex} from '../../../redux/videoListSlice';
import {useVideoListContext} from '../../../shared/context/VideoListContext';

type VideoListHookReturnType = [
  onViewableItemsChanged: (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => void,
  keyExtractor: (item: ITurn) => string,
];

export default function useVideoList(): VideoListHookReturnType {
  const {setActiveTurn} = useVideoListContext();
  const dispatch = useDispatch();

  const onViewableItemsChanged = (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => {
    if (
      info.viewableItems.length &&
      info.viewableItems[0].index !== undefined
    ) {
      const {item, index} = info.viewableItems[0];
      if (item !== null) {
        const currentActiveTurn = item as ITurn;
        setActiveTurn(currentActiveTurn);
      }
      if (index !== null) {
        dispatch(setIndex(index));
      }
    }
  };

  const keyExtractor = (item: ITurn) => {
    return item.turn_id;
  };

  return [onViewableItemsChanged, keyExtractor];
}
