import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import decode from "jwt-decode";
// import api, { setToken } from '../services/api';
import { store } from "../store";
// import { setCurrentUser } from '../store/actions/auth';
// import { addError } from '../store/actions/error';
import { setCurrentUser, addError, setToken } from "../store/actions";
import RouteView from "./RouteViews";
import NavBar from "./NavBar";
if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }
}
const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <NavBar />
        <RouteView />
      </Fragment>
    </Router>
  </Provider>
);

export default App;
