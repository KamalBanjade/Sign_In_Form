import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for ToastContainer
import App from './App';

// Replace ReactDOM.render with createRoot
const root = createRoot(document.getElementById('root')); // Use createRoot

// Render your app inside the root along with the ToastContainer
root.render(
  <>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    <ToastContainer /> {/* Include the ToastContainer */}
  </>
);
