import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers'
import PageNotFound from './pages/404'
import URI from 'urijs';

const store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState());
})

if(!localStorage.getItem('token')) localStorage.setItem('token', '')

function Greeting(props) {
  const domain = 'http://' + window.location.hostname + '.com'
  const subdomain = new URI(domain).subdomain()

  if (subdomain !== '') {
    return (
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    )
  }
  return < PageNotFound/>;
}

ReactDOM.render(
  <Greeting/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
