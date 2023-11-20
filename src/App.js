import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Routes/Home';
import Pagina from './Routes/Log';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/home' Component={Home}/>
          <Route exact path='/' Component={Pagina}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
