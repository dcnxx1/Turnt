import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Flex} from '../../components';
import {TextInput} from 'react-native-paper';
import {ITurn} from '../../models/turn';

export type EditorFieldValues = {
  title: ITurn['title'];
};

export default function EditorForm() {
  const {watch, control} = useForm<EditorFieldValues>();
  return (
    <Flex>
      <Controller
        render={({field: {onChange, value}}) => (
          <TextInput label={'Titel'} onChange={onChange} value={value} />
        )}
        name="title"
        control={control}
      />
    </Flex>
  );
}
