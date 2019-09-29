(function (window) {
  'use strict';

  const BASE_URL = window.location.origin.includes("localhost") ? "http://localhost:3003" : window.location.origin;

  window.appConfig = {
    DEVELOPMENT: window.location.origin.includes("localhost"),
    URL: BASE_URL
  };
}(window));
