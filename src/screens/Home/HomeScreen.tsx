import { FlashList, ViewToken } from '@shopify/flash-list';
import { useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View, ViewabilityConfig } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import GenericScreen from '../../components/Screen/GenericScreen';
import { ITurn } from '../../models/turn';
import { RootState } from '../../redux/store';
import { setActiveVideo, setIndex } from '../../redux/videoListSlice';
import { useFeedQuery } from '../../shared/hooks/useQueryData';

function HomeScreen(): JSX.Element {
  const {data: turns} = useFeedQuery();

  const ref = useRef<FlashList<ITurn>>(null);

  const index = useSelector(
    (state: RootState) => state.videoListSliceHome.currentListIndex,
  );
  const dispatch = useDispatch();
  const viewConfig = useRef<ViewabilityConfig>({
    itemVisiblePercentThreshold: 40,
    waitForInteraction: false,
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length && viewableItems[0].index !== undefined) {
      const {item, index} = viewableItems[0];
      item !== null &&
        dispatch(
          setActiveVideo({
            turn_id: item.title,
            duration: item.duration,
          }),
        );
      index !== null && dispatch(setIndex(index));
    }
  };

  useEffect(() => {
    ref.current &&
      ref.current.scrollToIndex({
        animated: true,
        index,
      });
  }, [index, ref]);

  const content = useMemo(
    () => (
      <FlashList
        ref={ref}
        data={turns}
        automaticallyAdjustContentInsets={false}
        automaticallyAdjustsScrollIndicatorInsets={false}
        automaticallyAdjustKeyboardInsets={false}
        estimatedItemSize={Dimensions.get('screen').height}
        estimatedListSize={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
        viewabilityConfig={viewConfig.current}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={item => String(item.turn_id)}
        renderItem={item => (
          <View
            style={{
              height: Dimensions.get('screen').height,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'green',
            }}>
            <Text>{item.item.title}</Text>
          </View>
        )}
      />
    ),
    [turns],
  );
  return <GenericScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
