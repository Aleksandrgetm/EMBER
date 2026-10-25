import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MotionPreferenceProvider } from './components/MotionPreference';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter><MotionPreferenceProvider><App /></MotionPreferenceProvider></BrowserRouter></React.StrictMode>
);
