import {ListRenderItem} from '@shopify/flash-list';
import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Flex, SkeletonScreen} from '../../components';
import SkeletonFlashList from '../../components/List/SkeletonFlashList';
import {withLinearGradient} from '../../components/Screen/SkeletonScreen';
import {IOnBoardProps, onBoardingText} from '../../constants';
import theme from '../../theme';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AccountSetupParams} from '../../nav/navparams';
const LinearGradientScreen = withLinearGradient(SkeletonScreen);

export default function OnBoardScreen() {
  const padding = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<AccountSetupParams>>();

  const onPressNext = () => {
    navigation.replace('AuthScreen');
  };

  const renderItem: ListRenderItem<IOnBoardProps> = ({item, index}) => {
    return (
      <Flex
        style={[
          Style.onBoardScreenContainer,
          {paddingTop: padding.top, paddingBottom: padding.bottom},
        ]}>
        {item.header.logo && (
          <Image source={{uri: 'https://unsplash.it/200/200'}} />
        )}

        <Text style={Style.headerText}>
          {onBoardingText[index].header.text}
        </Text>

        <Text style={Style.headerText}>{onBoardingText[index].body}</Text>

        <Text style={Style.headerText}>{onBoardingText[index].footer}</Text>
        {item.id === 3 ? (
          <Button
            textColor={theme.color.white}
            style={Style.button}
            onPress={onPressNext}>
            Doorgaan
          </Button>
        ) : null}
      </Flex>
    );
  };

  const keyExtractor = (item: IOnBoardProps) => {
    return String(item.id);
  };

  const content = (
    <SkeletonFlashList
      decelerationRate={'fast'}
      snapToAlignment={'start'}
      showsHorizontalScrollIndicator={false}
      disableIntervalMomentum
      keyExtractor={keyExtractor}
      data={onBoardingText}
      renderItem={renderItem}
    />
  );

  return (
    <LinearGradientScreen
      contentStyle={Style.container}
      gradient={[theme.color.turner, theme.color.turnerPurpleBright]}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  container: {},
  flashListContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  onBoardScreenContainer: {
    height: Dimensions.get('screen').height,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerText: {
    fontSize: 25,
    color: theme.color.white,
  },
  button: {
    width: '50%',
    borderColor: theme.color.white,
    borderWidth: 2,
  },
});
