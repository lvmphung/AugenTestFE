import React from 'react';
import './App.css';
import Customer from './components/customers/Customers';
import Header from './components/header/Header';

const App: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <Customer></Customer>
    </div>
  );
}

export default App;
