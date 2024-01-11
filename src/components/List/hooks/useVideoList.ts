import {useRef, useState} from 'react';
import {ITurn} from '../../../models/turn';

type Props = {
  data: ITurn[];
};
export default function useVideoList({data}: Props) {
  const onViewableItemsChanged = () => {};
  const renderItem = () => {};
  const keyExtractor = () => {};
  const viewConfigRef = useRef(null);
  
}
