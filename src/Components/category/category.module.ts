import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule } from "@nativescript/angular";

import { CategoryComponent } from "./category.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            // { path: "", redirectTo: "category"},
            // { path: "category", component: CategoryComponent }
        ])
    ],
    declarations: [
        CategoryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CategoryModule { }