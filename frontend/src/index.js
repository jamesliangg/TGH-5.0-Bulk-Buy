import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

import AppRouter from './AppRouter';
// import store from "./redux/configureStore"
// import "./styles/App.css"
//  import 'bootstrap/dist/css/bootstrap.min.css';


// const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    // </PersistGate>
  // </Provider>
);