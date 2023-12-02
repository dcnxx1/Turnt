import {ListRenderItem} from '@shopify/flash-list';
import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Flex, SkeletonScreen} from '../../components';
import SkeletonFlashList from '../../components/List/SkeletonFlashList';
import {withLinearGradient} from '../../components/SkeletonScreen/SkeletonScreen';
import {IOnBoardProps, onBoardingText} from '../../constants';
import theme from '../../theme';

import {Text} from 'react-native-paper';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);
const estimatedListSize = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
const estimatedItemSize = Dimensions.get('screen').height;

export default function OnBoardScreen() {
  const renderItem: ListRenderItem<IOnBoardProps> = ({item, index}) => {
    return (
      <Flex style={Style.onBoardScreenContainer}>
        {item.header.logo && (
          <Image source={{uri: 'https://unsplash.it/200/200'}} />
        )}
        <Text style={Style.headerText}>
          {onBoardingText[index].header.text}
        </Text>

        <Text style={Style.headerText}>{onBoardingText[index].body}</Text>

        <Text style={Style.headerText}>{onBoardingText[index].footer}</Text>
      </Flex>
    );
  };

  const keyExtractor = (item: IOnBoardProps) => {
    return String(item.id);
  };

  const content = (
    <SkeletonFlashList
      snapToInterval={estimatedItemSize}
      decelerationRate={'fast'}
      snapToAlignment={'start'}
      snapToStart
      
      disableIntervalMomentum
      // hasSafeAreaInsets
      estimatedItemSize={estimatedItemSize}
      estimatedListSize={estimatedListSize}
      keyExtractor={keyExtractor}
      data={onBoardingText}
      renderItem={renderItem}
    />
  );

  return (
    <LinearGradientScreen
      style={Style.container}
      gradient={[theme.color.turner, theme.color.turnerPurpleBright]}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'white',
  },
  flashListContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  onBoardScreenContainer: {
    height: Dimensions.get('screen').height,
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    color: theme.color.white,
  },
  bodyText: {},
  footerText: {},
});
