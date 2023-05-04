import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./components/Login";
import { Colors } from './utils/Colors';

export default function App() {
  const [checked, setChecked] = useState();

  return (
    <Login
      
    />
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