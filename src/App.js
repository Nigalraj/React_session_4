// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataFetcher from './components/DataFetcher';
import ItemDetail from './components/ItemDetail';
import NotFound from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My React App</h1>
        </header>
        <Routes>
        <Route exact path="/" element={<DataFetcher/>} />
          <Route path="/item/:id" element={<ItemDetail/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
