import React from 'react';
import ReactDOM from 'react-dom/client';
import Context from './components/ContextProvider/Context';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context>
);
