import {RecyclerListView, RecyclerListViewProps} from 'recyclerlistview';
import {forwardRef} from 'react';
import {View} from 'react-native';

type Props<T> = {
  dataProvider: T[];
};

export default function GenericRecyclerListView() {
  return <View></View>;
}
