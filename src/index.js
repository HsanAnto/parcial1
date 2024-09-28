import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de usar 'react-dom/client' para React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IntlProvider } from 'react-intl';
import localeEnMessages from "./locales/en";
import localeEsMessages from "./locales/es";

// Definir las traducciones disponibles
const messages = {
  'es': localeEsMessages,
  'en': localeEnMessages
};

// Normalizar el idioma para que solo use 'es' o 'en'
const language = navigator.language.split(/[-_]/)[0]; // Normaliza el código de idioma ('es-ES' -> 'es', 'en-US' -> 'en')

// Verificar si el idioma está soportado; si no, usar español por defecto
const selectedMessages = messages[language] || messages['es'];

// Cambia `ReactDOM.render` por `createRoot`
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <IntlProvider locale={language} messages={selectedMessages}>
    <App />
  </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
