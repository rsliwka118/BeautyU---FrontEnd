import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

import { VisitsComponent } from "./visits.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            { path: "", redirectTo: "visits"},
            { path: "", component: VisitsComponent }
        ])
    ],
    declarations: [
        VisitsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VisitsModule { }