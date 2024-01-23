import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Dimensions, View, ViewabilityConfig} from 'react-native';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import SkeletonFlashList from './SkeletonFlashList';
import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {ITurn} from '../../models/turn';
import {Text} from 'react-native-paper';
import {setIndex} from '../../redux/videoListSlice';

type Props = {
  id: 'playlistSlice' | 'homeSlice';
  data: ITurn[];
};
export default function TestList({id, data}: Props) {
  const {index, isActive} = useSelector((state: RootState) => state[id]);
  const flashListRef = useRef<FlashList<ITurn>>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({
      index,
      inside: id,
    });
  }, [index]);
  const onViewableItemsChanged = useCallback(
    (info: {changed: ViewToken[]; viewableItems: ViewToken[]}) => {
      if (
        info.viewableItems.length &&
        info.viewableItems[0].index !== undefined
      ) {
        const {index: bindex} = info.viewableItems[0];
        console.log('onViewable Called for :>>', id);
        if (bindex !== null) {
          console.log('OnViewableItemsChanged index :>', bindex, id);
          dispatch(setIndex(bindex));
        }
      }
    },
    [],
  );

  const renderItem: ListRenderItem<ITurn> = ({item}) => {
    return (
      <View
        style={{
          width: '100%',
          height: Dimensions.get('screen').height,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 44}}>{item.title}</Text>
      </View>
    );
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  const keyExtractor = (item: ITurn) => {
    return item.turn_id;
  };

  return (
    <SkeletonFlashList
      data={data}
      ref={flashListRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToAlignment="start"
      snapToInterval={Dimensions.get('screen').height}
      viewabilityConfig={viewConfigRef}
      onViewableItemsChanged={onViewableItemsChanged}
      decelerationRate={'fast'}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
    />
  );
}
