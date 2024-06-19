import React from 'react';
import { Dimensions } from 'react-native';
import Routers from './src/routers';

const { width, height } = Dimensions.get('window');

export default function App() {

  return (
    <Routers />
  );
}