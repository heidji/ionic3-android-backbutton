# Ionic 3 Android Back Button Handler

[![NPM version][npm-image]][npm-url]

## Installation
```
npm i ionic3-android-backbutton
```

## Adding to project

Update your **app.module.ts** as follows:

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

import {BackbuttonModule} from "ionic3-android-backbutton";

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        BackbuttonModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}

```

## Usage
most cases where this plugin is useful is to prevent the user from exiting the app before a certain condition is fulfilled, this is where the plugin gets useful especially when using the `registerBeforeExit()` method. See the example below.

these methods act globally and will affect the whole app so you need to unregister them manually after you don't need them.

### Example1:
make sure user sees an alert before he leaves the app
```typescript
import {Component} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {Backbutton} from "ionic3-android-backbutton";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public bb: Backbutton, public alertCtrl: AlertController) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.bb.registerBeforeExit(() => {
                    let alert = this.alertCtrl.create({
                        title: 'You are now going to exit the app',
                        buttons: ['OK']
                    });
                    alert.present();
                    alert.onDidDismiss(() => {
                        this.bb.exit()
                    });
                    return false;
            })
        });
    }
}
```
### Example 2:
make user press back button a few times before being able to leave the page.
```typescript
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Backbutton} from "ionic3-android-backbutton";

@IonicPage()
@Component({
    selector: 'page-article',
    templateUrl: 'article.html',
})
export class ArticlePage {

    bbcounter = 5;

    constructor(public navCtrl: NavController, public navParams: NavParams, public bb: Backbutton, public toastCtrl: ToastController) {
    }

    ionViewDidEnter() {
        this.bb.registerDefaultAction(() => {
            this.bbcounter --;
            if(this.bbcounter > 0){
                this.toastCtrl.create({
                    message: 'Press back '+this.bbcounter+' more times',
                    duration: 3000,
                    position: 'bottom'
                }).present();
                return false; //cancel backbutton action
            } else {
                this.bb.unregisterAction('default'); //unregistering function because we won't need it anymore
                return true; //allow backbutton action
            }
        })
    }

}

```
### Methods
#### registerDefaultAction(f: Function)
register the function to be called whenever the back button is pressed. If your function returns true, the default back button behavior with be triggered, if your function returns false the default behavior will be canceled.
#### registerBeforeExit(f: Function)
register the function to be called whenever the app is about to exit upon hardware back button press. If your function returns true, the default back button behavior with be triggered and your app will exit, if your function returns false the default behavior will be canceled.

#### unregisterAction(type: string){
| type           | Description                           |
| -------------- | --------------------------------------|
| `default`      | unregister `registerDefaultAction()`  |
| `beforeexit`   | unregister `registerBeforeExit()`     |

#### unregisterAll()
reverts back button default behavior.

#### back()
emulate android back button (including potentially exiting the app).

#### exit()
exit the app.

[npm-url]: https://npmjs.org/package/ionic3-android-backbutton
[npm-image]: https://img.shields.io/badge/npm-0.0.15-green.svg
