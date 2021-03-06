import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // Whether or not to enable debug mode
  public enableDebug = true;

  public ssoURL = '';
  public ssoRealm = '';
  public ssoClientId = '';
  public ssoClientCredentials = '';
  public ssoLogoutRedirectUrl = '';

  public websocketUrl = '';

  constructor() { }
}
