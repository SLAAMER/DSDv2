import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './services/session/session.service';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'analytics'
    },
    {
      title: 'Simulator',
      url: '/simulator',
      icon: 'medkit'
    },
    {
      title: 'Layout',
      url: '/layout',
      icon: 'easel'
    },
    {
      title: 'Log Out',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private session: SessionService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.session.getSession().then((session)=>{
        if(!session){
          this.session.session = session;
          this.router.navigateByUrl('/login').then(()=>{
            this.statusBar.styleDefault();
            this.splashScreen.hide();
          });
        }
      });
      
    });
  }
}
