import {ListRenderItem, ViewToken} from '@shopify/flash-list';
import {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, ViewabilityConfig} from 'react-native';
import {TestData} from '../../screens/Home/HomeScreen';
import SkeletonScreen from '../SkeletonScreen/SkeletonScreen';
import Turn from '../Turn/Turn';
import SkeletonFlashList from './SkeletonFlashList';
import {useTurnContext} from '../../shared/context/TurnContext';

type CollectionTurnProps = {
  data: TestData[];
};

export default function CollectionTurn({data}: CollectionTurnProps) {
  const {handleSetActiveTurnId} = useTurnContext();

  const renderItem: ListRenderItem<TestData> = ({item, index}) => {
    return <Turn id={item.id} source={item.source} />;
  };

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
      const {item} = info.viewableItems[0];
      if (item !== null) {
        const currentActiveTurn = item as TestData;
        handleSetActiveTurnId(currentActiveTurn.id);
      }
    }
  };

  const viewConfigRef = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 95,
  }).current;

  const content = (
    <SkeletonFlashList
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

  return <SkeletonScreen style={Style.container} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    
  },
});