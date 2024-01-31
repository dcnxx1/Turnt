import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useDispatch} from 'react-redux';
import {ITurn} from '../../../models/turn';
import {
  setActiveTurn,
  setActiveVideo,
  setIndex,
  setIsPlaying,
} from '../../../redux/videoListSlice';
import {useActiveTurnStore} from '../../../store';
import {turnToTrackMapper} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeParams} from '../../../nav/navparams';

type VideoListHookReturnType = [
  keyExtractor: (item: ITurn) => string,
  viewablityConfigCallbackPairs: React.MutableRefObject<
    ViewabilityConfigCallbackPair[]
  >,
];

const VIDEO_BECAME_ACTIVE_AT_PERCENT = 95;

export default function useVideoList(): VideoListHookReturnType {
  const setGlobalActiveTurn = useActiveTurnStore(state => state.setActiveTurn);
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
          dispatch(
            setActiveVideo({
              turn_id: currentActiveTurn.turn_id,
              duration: currentActiveTurn.duration,
            }),
          );

          setGlobalActiveTurn(currentActiveTurn);

          TrackPlayer.load(turnToTrackMapper(currentActiveTurn));
        }
        if (index !== null) {
          dispatch(setIndex(index));
        }
      }
    },
  ).current;

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
  const keyExtractor = useCallback((item: ITurn) => {
    return String(item.turn_id);
  }, []);

  return [keyExtractor, viewablityConfigCallbackPairs];
}
