import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { router } from './routes/routes'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store, persistedStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
const { REACT_APP_SERVER_URL } = process.env;

// const persisitor = persistStore(store)

const RunFuncion = () => {
  console.log('999999',REACT_APP_SERVER_URL);
  
  return (
    // <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <SnackbarProvider maxSnack={3}>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    // </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RunFuncion />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
