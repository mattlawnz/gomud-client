import './index.css'; // Importing the CSS file for the component

import * as React from 'react'; // Importing the React library
import * as ReactDOM from 'react-dom/client'; // Importing the ReactDOM library

import App from './App'; // Importing the App component

// Rendering the App component inside the root element of the HTML document
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
