import React, { useEffect} from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {

  useEffect(() =>{
    StatusBar.setBackgroundColor('#e14f50');
  },[]);

  return (
    <Routes/>
  );
};