import {FlashList} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';
import {ITurn} from '../../../models/turn';
import {setActiveTurn, setIndex} from '../../../redux/videoListSlice';
import {useVideoListContext} from '../../../shared/context/VideoListContext';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useActiveTurnStore} from '../../../store';
import {
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {turnToTrackMapper} from '../../../utils';
import {RootState} from '../../../redux/store';

type VideoListHookReturnType = [
  onViewableItemsChanged: (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => void,
  keyExtractor: (item: ITurn) => string,
  flashlistRef: React.RefObject<FlashList<ITurn>>,
  viewConfigRef: ViewabilityConfig,
  viewablityConfigCallbackPairs: React.MutableRefObject<
    ViewabilityConfigCallbackPair[]
  >,
];

const VIDEO_BECAME_ACTIVE_AT_PERCENT = 95;

export default function useVideoList(): VideoListHookReturnType {
  const setGlobalActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
  const flashListRef = useRef<FlashList<ITurn> | null>(null);
  const dispatch = useDispatch();

  const onViewableItemsChanged = useRef(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => {
      if (
        info.viewableItems.length &&
        info.viewableItems[0].index !== undefined
      ) {
        const {item, index} = info.viewableItems[0];

        if (item !== null) {
          const currentActiveTurn = item as ITurn;
          dispatch(setActiveTurn(currentActiveTurn));

          setGlobalActiveTurn(currentActiveTurn);

          TrackPlayer.load(turnToTrackMapper(currentActiveTurn));
        }
        if (index !== null) {
          dispatch(setIndex(index));
        }
      }
    },
  ).current;

  // const onViewableItemsChanged = (info: {
  //   changed: ViewToken[];
  //   viewableItems: ViewToken[];
  // }) => {
  //   if (
  //     info.viewableItems.length &&
  //     info.viewableItems[0].index !== undefined
  //   ) {
  //     const {item, index} = info.viewableItems[0];

  //     if (item !== null) {
  //       const currentActiveTurn = item as ITurn;
  //       dispatch(setActiveTurn(currentActiveTurn));

  //       setGlobalActiveTurn(currentActiveTurn);

  //       TrackPlayer.load(turnToTrackMapper(currentActiveTurn));
  //     }
  //     if (index !== null) {
  //       dispatch(setIndex(index));
  //     }
  //   }
  // };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: VIDEO_BECAME_ACTIVE_AT_PERCENT,
  }).current;

  const viewablityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPair[]>(
    [
      {
        viewabilityConfig: viewConfigRef,
        onViewableItemsChanged: onViewableItemsChanged,
      },
    ],
  );
  const keyExtractor = (item: ITurn) => {
    return item.turn_id;
  };

  return [
    onViewableItemsChanged,
    keyExtractor,
    flashListRef,
    viewConfigRef,
    viewablityConfigCallbackPairs,
  ];
}
