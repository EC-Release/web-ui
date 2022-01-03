import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import worker from "./worker.js";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-select/dist/js/bootstrap-select.min.js";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "datatables.net-dt/js/dataTables.dataTables"

import * as serviceWorker from "./serviceWorker";
import { AppError } from "./components/AppError";

/* (async function setCookie() {
  try {
    const response = await fetch("/setcookie");
    return await response.json();
  } catch (error) {
    return [];
  }
})(); */

/* istanbul ignore next */
if (window.Worker) {
  const code = worker.toString();
  const blob = new Blob(["(" + code + ")()"]);
  var myWorker = new Worker(URL.createObjectURL(blob));
  var authToken = getToken("ec-config");
  let Url = window.location.href;
  var message = {
    api: "/v1.2beta/ops/api/snapshot",
    authToken: authToken,
    currentLocation: Url,
  };
  myWorker.postMessage(message);
  myWorker.onmessage = function (e) {
    sessionStorage.setItem("snapshotData", JSON.stringify(e.data.result));
  };
  // var newWorker = new Worker("assets/user-worker.js");
  //  var userMessage = { userApi: userApi, authToken: authToken };
  //  newWorker.postMessage(userMessage);
  // newWorker.onmessage = function (e) {
  //     sessionStorage.setItem("userRole", e.data.user)
  //    };
}

/* istanbul ignore next */
function getToken(name) {
  var cookieName = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
}

/* istanbul ignore next */
ReactDOM.render(
  <AppError>
    <App />
  </AppError>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/* istanbul ignore next */
serviceWorker.register();
