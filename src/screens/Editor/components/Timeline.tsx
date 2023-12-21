import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import theme from '../../../theme';
import useGenerateThumbnails, {
  NUMBER_OF_THUMBNAILS_TO_EXTRACT,
} from '../hooks/useGenerateThumbnails';

const screenWidth = Dimensions.get('screen').width;

type Props = {
  duration: number;
  filePath: string;
};

export default function Timeline({duration, filePath}: Props) {
  const [thumbnails, isLoading] = useGenerateThumbnails(
    filePath,
    NUMBER_OF_THUMBNAILS_TO_EXTRACT,
  );

  return (
    <View style={Style.container}>
      {isLoading ? (
        <Text style={{color: 'white'}}>Timeline is loading...</Text>
      ) : (
        thumbnails.map(path => (
          <Image key={path} style={Style.image} source={{uri: path}} />
        ))
      )}
    </View>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: theme.color.turner,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 50,
    position: 'relative',
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 2,
  },
});
