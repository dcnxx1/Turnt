import {ReactNode} from 'react';
import Flex from '../Misc/Flex';
import LinearGradient from 'react-native-linear-gradient';

interface SkeletonScreenProps {
  children: ReactNode;
  withHeader?: boolean;
  gradient?: string[];
}

function SkeletonScreen({children, withHeader, gradient}: SkeletonScreenProps) {
  return <Flex>{children}</Flex>;
}

export default SkeletonScreen;
