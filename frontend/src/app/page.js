'use client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import '../pages/index.css';
import App from './components/App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

export default function Home() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  )
}

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import './pages/index.css';
// import App from './components/App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );