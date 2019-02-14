import {Injectable} from '@angular/core';
import {App, Platform} from "ionic-angular";

@Injectable()
export class Backbutton {

    funct: any = () => {return true;};
    beforeexit: any = () => {return true;};

    constructor(public platform: Platform, public app: App) {}

    registerDefaultAction(f: Function) {
        let nav = this.app.getRootNavs()[0];
        if(typeof nav == 'undefined') {
            console.warn('failed to regsiter default back button function');
            return false;
        }
        this.funct = f;
        let p: any = <any>this.platform;
        for (let x = 0; x < p._bbActions.length - 1; x++) {
            p._bbActions.pop();
        }
        this.platform.registerBackButtonAction(() => {
            if (this.funct()) {
                let tempnav: any = nav;
                let x = tempnav._app.navPop();
                if (!x) {
                    if(this.beforeexit())
                        this.platform.exitApp();
                }
            }

        }, 101);
    }

    registerBeforeExit(beforeexit: Function) {
        let nav = this.app.getRootNavs()[0];
        if (typeof nav == 'undefined') {
            console.warn('failed to regsiter default before-exit function');
            return false;
        }
        this.beforeexit = beforeexit;
        let p: any = <any>this.platform;
        for (let x = 0; x < p._bbActions.length - 1; x++) {
            p._bbActions.pop();
        }
        this.platform.registerBackButtonAction(() => {
            if (this.funct()) {
                let tempnav: any = nav;
                let x = tempnav._app.navPop();
                if (!x) {
                    if (this.beforeexit())
                        this.platform.exitApp();
                }
            }

        }, 101);
    }

    unregisterAction(type: string){
        if(type == 'default'){
            this.registerDefaultAction(() => {return true;});
        }else if(type == 'beforeexit'){
            this.registerBeforeExit(() => {return true;});
        }
    }

    unregisterAll(){
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

}
