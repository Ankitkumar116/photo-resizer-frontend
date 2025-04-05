import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found!");

ReactDOM.createRoot(rootElement).render(
  React.createElement(React.StrictMode, {}, React.createElement(App))
);
