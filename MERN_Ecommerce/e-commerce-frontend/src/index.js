import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
import { BrowserRouter  } from 'react-router-dom';
import SellYours from './Components/SellYours/SellYours';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
    <BrowserRouter>
    <SellYours/>
      <App />
      </BrowserRouter>
    </ShopContextProvider>
);
