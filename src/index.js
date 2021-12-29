import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ThirdwebProvider } from "@3rdweb/react";
import { Grommet } from 'grommet';

ReactDOM.render(
  <ThirdwebProvider 
    connectors={{injected:{}}} 
    supportedChainIds={[4]}
  >
    <Grommet plain>
      <App />
    </Grommet>
  </ThirdwebProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
