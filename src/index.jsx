import React from 'react';  // Make sure to import React
import { createRoot } from 'react-dom/client';
import MainView from './components/MainView/MainView';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainView />
  </React.StrictMode>
);