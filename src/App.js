import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import  Navbar  from './components/Navbar';
import {  Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import View from './components/View';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/view/:id" element={<View/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
