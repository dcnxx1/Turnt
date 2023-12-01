import {useNavigation} from '@react-navigation/native';
import {ListRenderItem} from '@shopify/flash-list';
import React from 'react';
import {Flex, SkeletonScreen} from '../../components';
import SkeletonFlashList from '../../components/List/SkeletonFlashList';
import WelcomeScreenPart, {WelcomeScreenPartProps} from './WelcomeScreenPart';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export default function WelcomeScreen() {
  const content = (
    <>
      <Flex borderWidth={2}>
        <Text style={{fontSize: 24, color: 'black'}}>Yo</Text>
      </Flex>

      <Flex borderWidth={2} borderColor={'yellow'}>
        <Text style={{fontSize: 24, color: 'black'}}>Text</Text>
      </Flex>
    </>
  );

  const footer = (
    <Flex>
      <Text>Hi</Text>
    </Flex>
  );

  return (
    <SkeletonScreen
      withFooter
      sectionProps={{
        sectionLeft: footer
      }}
      gradient={['#333', '#444']}
      withSafeAreaView
      style={Style.container}
      content={content}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white',
  },
});
