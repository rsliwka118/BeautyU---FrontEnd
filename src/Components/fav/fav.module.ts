import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

import { FavComponent } from "./fav.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "fav"},
            { path: "", component: FavComponent }
        ])
    ],
    declarations: [
        FavComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FavModule { }