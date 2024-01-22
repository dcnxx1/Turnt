import {FlashList, ViewToken} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';
import {ITurn} from '../../../models/turn';
import {setActiveTurn, setIndex} from '../../../redux/videoListSlice';
import {useVideoListContext} from '../../../shared/context/VideoListContext';
import {useEffect, useRef, useState} from 'react';
import {useActiveTurnStore} from '../../../store';
import {ViewabilityConfig} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {turnToTrackMapper} from '../../../utils';
import {RootState} from '../../../redux/store';

type VideoListHookReturnType = [
  onViewableItemsChanged: (info: {
    changed: ViewToken[];
    viewableItems: ViewToken[];
  }) => void,
  keyExtractor: (item: ITurn) => string,
  flashlistRef: React.RefObject<FlashList<ITurn>>,
  viewConfigRef: ViewabilityConfig,
];

const VIDEO_BECAME_ACTIVE_AT_PERCENT = 95;

export default function useVideoList(): VideoListHookReturnType {
  const setGlobalActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const dispatch = useDispatch();

  const onViewableItemsChanged = async (info: {
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
        dispatch(setActiveTurn(currentActiveTurn));

        setGlobalActiveTurn(currentActiveTurn);

        await TrackPlayer.load(turnToTrackMapper(currentActiveTurn));
      }
      if (index !== null) {
        dispatch(setIndex(index));
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: VIDEO_BECAME_ACTIVE_AT_PERCENT,
  }).current;

  const keyExtractor = (item: ITurn) => {
    return item.turn_id;
  };

  return [onViewableItemsChanged, keyExtractor, flashListRef, viewConfigRef];
}
