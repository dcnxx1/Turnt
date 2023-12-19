import {FlashList, ListRenderItem, ViewToken} from '@shopify/flash-list';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, ViewabilityConfig} from 'react-native';
import {TestData} from '../../screens/Home/HomeScreen';
import {useTurnContext} from '../../shared/context/TurnContext';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';
import VideoPlayerManager from '../Video/VideoPlayerManager';
import SkeletonFlashList from './SkeletonFlashList';

type CollectionTurnProps = {
  data: TestData[];
};

export default function CollectionTurn({data}: CollectionTurnProps) {
  const {handleSetActiveTurn} = useTurnContext();
  const [activeTurnIndex, setActiveTurnIndex] = useState(0);
  const ref = useRef<FlashList<TestData>>(null);

  const onEndTurn = () => {
    if (ref.current) {
      ref.current.scrollToIndex({
        animated: true,
        index: activeTurnIndex + 1,
      });
    }
  };

  const renderItem: ListRenderItem<TestData> = ({item, index}) => {
    return (
      <VideoPlayerManager
        source={item.source}
        videoId={item.id}
        onEnd={onEndTurn}
      />
    );
  };

  useEffect(() => {
    handleSetActiveTurn(data[0]);
  }, []);

  const keyExtractor = (item: TestData) => {
    return String(item.id);
  };

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
        const currentActiveTurn = item as TestData;
        handleSetActiveTurn(currentActiveTurn);
      }
      if (index !== null) {
        setActiveTurnIndex(index);
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  const content = (
    <SkeletonFlashList
      ref={ref}
      decelerationRate={'fast'}
      data={data}
      estimatedItemSize={Dimensions.get('screen').height}
      estimatedListSize={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
      }}
      bounces={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );

  return <SkeletonScreen content={content} />;
}
