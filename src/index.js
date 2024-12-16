import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new import
import './index.css';
import AppRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
