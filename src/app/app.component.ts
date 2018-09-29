import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation, private androidFullScreen: AndroidFullScreen, private backgroundMode: BackgroundMode) {
    // set to landscape
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.androidFullScreen.showUnderStatusBar().then(() => console.log('fullscreen')).catch((err) => console.log(err));
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      splashScreen.hide();
      this.backgroundMode.enable();
    });
  }
}

