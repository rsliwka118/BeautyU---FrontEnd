import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

import { BrowserComponent } from "./browser.component";
import { BrowserResolverService } from "./browser.resolver";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "browser"},
            { 
                path: "browser", 
                component: BrowserComponent,
                // resolve: {
                //     items: BrowserResolverService
                // } 
            }
        ])
    ],
    providers: [
        BrowserResolverService
    ],
    declarations: [
        BrowserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowserModule { }