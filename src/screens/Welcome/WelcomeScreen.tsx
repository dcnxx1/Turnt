import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {SkeletonScreen} from '../../components';
import SkeletonFlashList from '../../components/List/SkeletonFlashList';
import {
  withLinearGradient,
  withSafeAreaView,
} from '../../components/SkeletonScreen/SkeletonScreen';
import {WelcomeScreenPartProps} from './WelcomeScreenPart';

const LinearGradientScreen = withLinearGradient(
  withSafeAreaView(SkeletonScreen),
);
const estimatedItemSize = Dimensions.get('screen').height;
const estimatedListSize = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
export default function WelcomeScreen() {
  const keyExtractor = (item: WelcomeScreenPartProps, index: number) => {
    return String(item.id);
  };

  return (
    <SkeletonFlashList
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      estimatedListSize={estimatedListSize}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: 'white',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});
