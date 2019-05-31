(function (window) {
    window.__env = window.__env || {};

  
    window.__env.enableDebug = true;

    window.__env.ssoURL = 'https://localhost/auth/';
    window.__env.ssoRealm = 'opendj';
    window.__env.ssoClientId = 'opendj-clientId';
    window.__env.ssoClientCredentials = 'my-secret';

    window.__env.ssoLogoutRedirectUrl = 'http://localhost:8100/login';

  }(this));