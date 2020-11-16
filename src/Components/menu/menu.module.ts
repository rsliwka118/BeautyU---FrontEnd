import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";

import { MenuComponent } from "./menu.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild([
            {
                path: "",
                redirectTo: "default"
            },
            {
                path: "default",
                component: MenuComponent,
                children: 
                  [
                     {
                         path: "browser",
                         outlet: "browserTab",
                         component: NSEmptyOutletComponent,
                         loadChildren: () => import("../browser/browser.module").then((m) => m.BrowserModule)
                     }
                ]   
           }
        ])
    ],
    declarations: [
        MenuComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MenuModule { }