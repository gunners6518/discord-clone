import React from 'react';
import './App.css';
import {Dashboard} from './Dashboard';

import {Store }from './Store';

export const App =()=> {
  return (
    <Store>
      <Dashboard></Dashboard>
    </Store>
  );
}

