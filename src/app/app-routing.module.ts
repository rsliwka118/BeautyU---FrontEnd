import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { LoginComponent } from "../components/login/login.component";
import { AuthGuard } from "../auth-guard.service";
import { LoginGuard } from "../login-guard.service";
import { MenuComponent } from "../components/menu/menu.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    { 
        path: "login", 
        component: LoginComponent, 
        canActivate: [LoginGuard],
    },
    {
        path: "menu",
        component: MenuComponent,
        //loadChildren: () => import("../components/menu/menu.module").then((m) => m.MenuModule),
        canActivate: [AuthGuard],
        children: 
        [
           {
               path: "browser",
               outlet: "browserTab",
               component: NSEmptyOutletComponent,
               loadChildren: () => import("../components/browser/browser.module").then((m) => m.BrowserModule)
           },
           {
              path: "visits",
              outlet: "visitsTab",
              component: NSEmptyOutletComponent,
              loadChildren: () => import("../components/visits/visits.module").then((m) => m.VisitsModule)
          },
          {
              path: "fav",
              outlet: "favTab",
              component: NSEmptyOutletComponent,
              loadChildren: () => import("../components/fav/fav.module").then((m) => m.FavModule)
          },
          {
              path: "account",
              outlet: "accountTab",
              component: NSEmptyOutletComponent,
              loadChildren: () => import("../components/account/account.module").then((m) => m.AccountModule)
          }
      ]   
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: false })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
