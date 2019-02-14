import { NgModule, ModuleWithProviders } from '@angular/core';
import {Backbutton} from "./backbutton"

@NgModule({

})
export class HidenavModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HidenavModule,
            providers: [
                Backbutton
            ]
        };
    }
}