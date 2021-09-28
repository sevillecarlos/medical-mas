import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import './App.css'

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
