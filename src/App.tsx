import React from 'react';
import { Switch, Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Switch />
      <Layout />
    </div>
  );
}

export default App;
