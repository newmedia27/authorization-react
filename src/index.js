import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

import store from './store'
import Loader from "./components/loader/Loader";

export {store}

const app = (
  <Provider store={store}>
    <Suspense fallback={<Loader/>}>
      <App/>
    </Suspense>
    
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"));
