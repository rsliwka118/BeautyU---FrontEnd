import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

import { BrowserComponent } from "./browser.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "browser"},
            { path: "", component: BrowserComponent }
        ])
    ],
    declarations: [
        BrowserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowserModule { }