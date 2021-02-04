import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import 'reset.css';
import 'default.css';
import 'index.css';

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    {root ? (
      <React.StrictMode>
        <App root={root} />
      </React.StrictMode>
    ) : (
      <>Cannot display React because no root found!</>
    )}
  </React.StrictMode>,
  root
);
reportWebVitals();
