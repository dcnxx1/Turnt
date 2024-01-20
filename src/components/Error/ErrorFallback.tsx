import {
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import {ReactElement, ReactNode, useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {QueryErrorResetBoundary} from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
type Props = {
  queryKey: string;
  onRefetch: () => void;
  children: ReactElement;
  error: Error | null | undefined;
};

export default function ErrorFallback({
  queryKey,
  onRefetch,
  error,
  children,
}: Props) {
  
  const bb = useQueryErrorResetBoundary();
  const queryClient = useQueryClient();
  const onPress = async () => {};



  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          FallbackComponent={({resetError}) => (
            <>
              <Text>There was an error , try again :D</Text>
              <Pressable onPress={onPress}>
                <Text style={Style.text}>Try again</Text>
              </Pressable>
            </>
          )}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

const Style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'yellow',
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});
