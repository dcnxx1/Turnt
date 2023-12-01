import {Button, Icon, Text} from 'react-native-paper';
import {Flex, SkeletonScreen} from '../../components';
import {StyleSheet} from 'react-native';

export interface WelcomeScreenPartProps {
  id: number;
  header: {
    icon?: boolean;
    iconSource?: string;
    text: string;
  };
  body: string;

  footer: {
    text: string;
    button: boolean;
  };
  onPressButton?: () => void;
}

function WelcomeScreenPart({
  id,
  header,
  body,
  footer,
  onPressButton,
}: WelcomeScreenPartProps) {
  const content = (
    <>
      <Flex style={{borderWidth: 2, borderColor: 'yellow'}}>
        {header.icon && <Icon size={25} source={header.iconSource} />}
        <Text style={{fontSize: 25}}>{header.text}</Text>
      </Flex>
      <Flex>
        <Text>{body}</Text>
      </Flex>
      <Flex>
        {id === 3 && <Button onPress={onPressButton}>Yo</Button>}
        <Text>{footer.text}</Text>
      </Flex>
    </>
  );

  return <SkeletonScreen style={Style.container} key={id} content={content} />;
}

const Style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default WelcomeScreenPart;
