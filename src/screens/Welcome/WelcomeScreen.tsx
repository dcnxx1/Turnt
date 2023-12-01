import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Flex, SkeletonScreen } from '../../components';
import { withLinearGradient, withSafeAreaView } from '../../components/SkeletonScreen/SkeletonScreen';
import theme from '../../theme';

const LinearGradientScreen = withLinearGradient(withSafeAreaView(SkeletonScreen));

export default function WelcomeScreen() {
  const content = (
    <>
      <Flex style={[Style.imageContainer, Style.flexCenter]}>
        <Image
          style={Style.image}
          width={25}
          height={25}
          source={{uri: 'https://unsplash.it/200/200'}}
        />
        <Text style={Style.text}>Yo</Text>
      </Flex>
      <Flex style={Style.flexCenter}>
        <Text style={Style.text}>NewText now!</Text>
      </Flex>
    </>
  );

  const footer = (
    <Flex backgroundColor={'green'}>
      <Text style={{color: 'white', fontSize: 25}}>H545454i</Text>
    </Flex>
  );

  return (
    <LinearGradientScreen
      style={Style.container}
      footer={footer}
      gradient={[theme.color.turnerPurple, '#000']}
      content={content}
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
