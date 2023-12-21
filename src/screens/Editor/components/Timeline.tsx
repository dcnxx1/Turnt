import {useEffect} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Flex} from '../../../components';
import useGenerateThumbnails from '../hooks/useGenerateThumbnails';

const screenWidth = Dimensions.get('screen').width;

type Props = {
  duration: number;
  filePath: string;
};

export default function Timeline({duration, filePath}: Props) {
  const [thumbnails, isLoading] = useGenerateThumbnails(filePath, 13);
  
  return (
    <Flex style={Style.container}>
      {isLoading ? (
        <Text style={{color: 'white'}}>Timeline is loading...</Text>
      ) : (
        thumbnails.map(path => (
          <Image key={path} style={Style.image} source={{uri: path}} />
        ))
      )}
    </Flex>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'yellow',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: '100%',
    borderWidth: 2,
  },
});
