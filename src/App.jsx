import React from 'react';
import MainView from './components/MainView/MainView';
import './styles.scss';
import 'process/browser';

export default function App() {
  return (
    <div className="app">
      <MainView />
    </div>
  );
}
