import { StyleSheet, Text, View } from 'react-native';
import Login from "./components/Login";
import CustomTextInput from './components/inputs/CustomTextInput';
import { Sizes } from './utils/Sizes';

export default function App() {
  return (
    <View style={StyleSheet.container}>
      
      <Login />
      
      <CustomTextInput
        placeHolder={'Nome'}
        size={Sizes.small}
      />

    <CustomTextInput
      placeHolder={'Nome de utilizador'}
      size={Sizes.big}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});