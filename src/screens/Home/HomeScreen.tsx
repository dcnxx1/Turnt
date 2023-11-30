import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {Flex, SkeletonScreen} from '../../components';
import {ScreenHeaderProps} from '../../components/Header/ScreenHeader';

function HomeScreen(): JSX.Element {
  const content = (
    <>
      <ScrollView contentContainerStyle={Style.scrollView}>
        <Flex style={Style.upperText}>
          <Text>Yo</Text>

          <Flex style={Style.upperText}>
            <Text>bozhoe</Text>
          </Flex>
        </Flex>
      </ScrollView>
    </>
  );

  const headerContent: ScreenHeaderProps = {
    headerLeft: <Icon size={25} source={'camera'} />,
    headerRight: (
      <Flex>
        <Flex>
          <Text>Booboo</Text>
        </Flex>
      </Flex>
    ),
  };

  return (
    <SkeletonScreen
      style={Style.container}
      content={content}
      headerProps={headerContent}
    />
  );
}

const Style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  upperText: {
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'green',
    width: Dimensions.get('screen').width,
  },
});

export default HomeScreen;
