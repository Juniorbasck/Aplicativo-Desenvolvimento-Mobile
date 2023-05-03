import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./components/Login";
import CustomTextInput from './components/input/CustomTextInput';
import { CustomCheckBox } from './components/checkbox/CustomCheckbox';
import { Colors } from './utils/Colors';

export default function App() {
  const [checkboxState, setCheckboxState] = useState('unchecked');
  const [textInput, setTextInput] = useState('');

  return (
    <View style={styles.container}>
      <CustomCheckBox
        text={'Concordo com os termos e condições'}
        textBold={true}
        textUnderline={true}
        setState={setCheckboxState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryKeyColor
  }
});