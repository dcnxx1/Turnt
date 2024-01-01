import BottomSheet from '@gorhom/bottom-sheet';
import {useMemo} from 'react';
import {Text} from 'react-native-paper';

type Props = {
  tabHeight: number;
};

export default function PlaylistSheet({tabHeight}: Props) {
  const snapPoints = useMemo(() => ['5%', '100%'], []);
  return (
    <BottomSheet bottomInset={tabHeight} snapPoints={snapPoints}>
      <Text>BottomShitText</Text>
    </BottomSheet>
  );
}
