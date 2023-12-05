import React, {ReactElement} from 'react';
import {Controller, useForm, UseFormWatch} from 'react-hook-form';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import Flex from '../Misc/Flex';

export interface SkeletonFormInputs<T> {
  name: string | 'button';
  node: ReactElement<any>;
  returnErrorWhen?: (
    value: any,
    compareWithInput: UseFormWatch<{[key: string]: any}>,
  ) => string | undefined;
}

interface SkeletonFormProps {
  onSubmit: (values: any) => void;
  forms: SkeletonFormInputs<any>[];
  style?: StyleProp<ViewStyle>;
  defaultValues?: {[key: string]: any};
}

export default function SkeletonForm({
  onSubmit,
  style,
  forms,
  defaultValues,
}: SkeletonFormProps) {
  const {
    control,
    watch,
    handleSubmit,

    formState: {errors},
  } = useForm({defaultValues: defaultValues, delayError: 5000});

  return (
    <Flex style={style}>
      {forms.map(item => {
        return item.name === 'button' ? (
          React.cloneElement(item.node, {
            key: item.name,
            onPress: handleSubmit(onSubmit),
          })
        ) : (
          <Flex style={Style.inputContainer}>
            <Controller
              key={item.name}
              rules={{
                validate: (value: string) =>
                  item.returnErrorWhen && item.returnErrorWhen(value, watch),
              }}
              render={({field: {onChange, value}}) =>
                React.cloneElement(item.node, {
                  onChangeText: onChange,
                  value: value,
                })
              }
              name={item.name}
              control={control}
            />
            <Text style={{color: 'white'}}>
              {String(errors[item.name] ? errors[item.name]?.message : '')}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

const Style = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    alignItems: 'center',
  },
});
