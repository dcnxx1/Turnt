import {Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useImpression} from '../../../store/useImpression';
import {useSeek} from '../../../store/useSeek';

export function MediaImpressionButton() {
  const {isImpression, setImpression} = useImpression();

  const handleImpression = () => {
    setImpression(!isImpression);
  };

  return (
    <Button onPress={handleImpression} style={Style.container}>
      <Image
        style={Style.imageStyle}
        source={{uri: 'https://unsplash.it/200/200'}}
      />
    </Button>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'white',
    height: '20%',
    width: '10%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
