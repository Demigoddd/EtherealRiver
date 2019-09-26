(function(window) {
  'use strict';

  const BASE_URL = window.location.origin.includes("localhost") ? "http://localhost:3003" : window.location.origin;

  window.appConfig = {
    URL: BASE_URL
  };
}(window));
