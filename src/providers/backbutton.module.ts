import { NgModule, ModuleWithProviders } from '@angular/core';
import {Backbutton} from "./backbutton";

@NgModule({

})
export class BackbuttonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BackbuttonModule,
            providers: [
                Backbutton
            ]
        };
    }
}