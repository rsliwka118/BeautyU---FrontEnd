import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { HttpInterceptorService } from "../../shared/http/http-interceptor.service";

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
                     },
                     {
                        path: "visits",
                        outlet: "visitsTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: () => import("../visits/visits.module").then((m) => m.VisitsModule)
                    },
                    {
                        path: "fav",
                        outlet: "favTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: () => import("../fav/fav.module").then((m) => m.FavModule)
                    },
                    {
                        path: "account",
                        outlet: "accountTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: () => import("../account/account.module").then((m) => m.AccountModule)
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