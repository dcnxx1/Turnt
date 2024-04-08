import {Text} from 'react-native-paper';
import {Flex} from '../../../components';

import {Pressable, StyleSheet, View} from 'react-native';
import {Genre} from '../../../models/turn';
import theme from '../../../theme';

type Props = {
  value: Genre;
  onChange: (genre: Genre) => void;
};

export default function GenreSelect({value, onChange}: Props) {
  return (
    <Flex style={Style.container}>
      <Text style={Style.text}>Kies genre</Text>
      {Array.from([
        'Hiphop',
        'Rap',
        'Trap',
        'Hardstyle',
        'HardCore',
        'Pop',
        'Drill',
      ]).map(g => (
        <RadioButton
          key={g}
          value={g as Genre}
          selectedValue={value}
          onChange={onChange}
        />
      ))}
    </Flex>
  );
}

const RadioButton = ({
  onChange,
  value,
  selectedValue,
}: Props & {selectedValue: Genre}) => {
  const isSelected = selectedValue === value;
  return (
    <Pressable onPress={() => onChange(value)} style={Style.item}>
      <Flex>
        <Text style={Style.text}>{String(value)}</Text>
      </Flex>
      <View style={Style.radioButton}>
        <View
          style={[
            Style.innerCircle,
            {
              backgroundColor: isSelected
                ? theme.color.turner
                : theme.color.transparent,
            },
          ]}></View>
      </View>
    </Pressable>
  );
};
const Style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButton: {
    borderWidth: 2,
    borderColor: 'white',
    width: 25,
    height: 25,
    padding: 5,
    borderRadius: 25 / 2,
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 25 / 2,
  },
});
