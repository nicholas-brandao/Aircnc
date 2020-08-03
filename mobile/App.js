import React, { useEffect} from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

export default function App() {

  useEffect(() =>{
    StatusBar.setBackgroundColor('#e14f50');
  },[]);

  YellowBox.ignoreWarnings('Unrecognized WebSocket');

  return (
    <Routes/>
  );
};