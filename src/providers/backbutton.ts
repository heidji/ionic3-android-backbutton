import {Injectable} from '@angular/core';
import {App, Platform} from "ionic-angular";

@Injectable()
export class Backbutton {

    funct: any = () => {
        return true;
    };
    beforeexit: any = () => {
        return true;
    };

    constructor(public platform: Platform, public app: App) {
    }

    private register() {
        let nav = this.app.getRootNavs()[0];
        if (typeof nav == 'undefined') {
            console.warn('failed to register default back button function');
            return false;
        }
        let p: any = <any>this.platform;
        for (let x = 0; x < p._bbActions.length - 1; x++) {
            p._bbActions.pop();
        }
        this.platform.registerBackButtonAction(() => {
            if (this.funct()) {
                let tempnav: any = nav;
                if (tempnav._app._menuCtrl && tempnav._app._menuCtrl.isOpen()) {
                    tempnav._app._menuCtrl.close();
                } else {
                    let x = tempnav._app.navPop();
                    if (!x) {
                        if (this.beforeexit())
                            this.platform.exitApp();
                    }
                }
            }

        }, 101);
    }

    registerDefaultAction(f: Function) {
        this.funct = f;
        this.register();
    }

    registerBeforeExit(beforeexit: Function) {
        this.beforeexit = beforeexit;
        this.register();
    }

    unregisterAction(type: string) {
        if (type == 'default') {
            this.registerDefaultAction(() => {
                return true;
            });
        } else if (type == 'beforeexit') {
            this.registerBeforeExit(() => {
                return true;
            });
        }
    }

    unregisterAll() {
        let nav = this.app.getRootNavs()[0];
        if (typeof nav == 'undefined') {
            console.warn('failed to unregister all actions');
            return false;
        }
        let p: any = <any>this.platform;
        for (let x = 0; x < p._bbActions.length - 1; x++) {
            p._bbActions.pop();
        }
    }

    back() {
        let nav = this.app.getRootNavs()[0];
        let tempnav: any = nav;
        if (tempnav._app._menuCtrl && tempnav._app._menuCtrl.isOpen()) {
            tempnav._app._menuCtrl.close();
        } else {
            let x = tempnav._app.navPop();
            if (!x) {
                if (this.beforeexit())
                    this.platform.exitApp();
            }
        }
    }

    exit() {
        this.platform.exitApp();
    }

}
