import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import { Image } from "react-bootstrap";

import logo from "./assets/img/logo-mas.png";

import "./App.css";

function App() {
  const isMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="app">
      <div className="ribbon">
        <a href="https://github.com/sevillecarlos/clock" target="blank">
          @sevillecarlos🍒
        </a>
      </div>
      {isMobile() ? (
        <div className="only-computer-msg">
          The MAS{" "}
          <Image src={logo} alt="MAS Logo" className="logo-only-computer-msg" />{" "}
          application is only able for computer
        </div>
      ) : (
        <Provider store={store}>
          <Routes />
        </Provider>
      )}
    </div>
  );
}

export default App;
