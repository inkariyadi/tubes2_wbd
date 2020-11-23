import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DaftarHarga from './components/daftarHarga';
import BeliBahan from './components/beliBahan';
import StickyHeadTable from './components/tes';

ReactDOM.render(
  <React.StrictMode>
    {/* <DaftarHarga/> */}
    {/* <BeliBahan/> */}
    <StickyHeadTable/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
