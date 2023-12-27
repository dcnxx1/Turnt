import {ComponentType} from 'react';

type Props<T> = {
  children: T;
};

type PlaybackType = {};

export default function withSyncTrackPlayer<T>(Component: ComponentType<T>) {
  return ({...props}: T) => {
   
  };
}
