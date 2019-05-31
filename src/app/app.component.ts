import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { UserData } from './provider/user-data';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { EnvService } from './provider/env.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  loggedIn = false;
  userDetails: KeycloakProfile;

  public appPagesLoggedIn = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Playlist',
      url: '/list',
      icon: 'play-circle'
    },
    {
      title: 'My Events',
      url: '/events',
      icon: 'wine'
    }
  ];

  public appPagesLoggedOut = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }
  ];

  public appPages = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private router: Router,
    private menu: MenuController,
    private userData: UserData,
    private keycloakService: KeycloakService,
    private envService: EnvService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    console.log('onInit');
    this.checkLoginStatus();
    // this.listenForLoginEvents();
  }

  async checkLoginStatus() {
    if (await this.keycloakService.isLoggedIn()) {
      this.appPages = this.appPagesLoggedIn;
      this.userDetails = await this.keycloakService.loadUserProfile();
      console.dir(this.userDetails);
      this.userData.login(this.userDetails.username);
      this.router.navigateByUrl('/home');
      this.loggedIn = true;
    } else {
      this.appPages = this.appPagesLoggedOut;
    }

    /*
    return this.userData.isLoggedIn().then(loggedIn => {
      //console.log('check loggedIn status: '+loggedIn);
      if(loggedIn === null){
        loggedIn = false;
      }
      return this.updateLoggedInStatus(loggedIn);
    });*/
  }

  /*
  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
      if(this.loggedIn){
        this.appPages = this.appPagesLoggedIn;
        this.router.navigateByUrl('/home');
      } else {
        this.appPages = this.appPagesLoggedOut;
      }
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }
  */
  logout() {
    this.userData.logout().then(() => {
      this.keycloakService.logout(this.envService.ssoLogoutRedirectUrl);
    });
  }

}
