import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { LoginComponent } from "../components/login/login.component";
import { AuthGuard } from "../auth-guard.service";
import { LoginGuard } from "../login-guard.service";
import { MenuComponent } from "../components/menu/menu.component";
import { BrowserComponent } from "../components/browser/browser.component";
import { VisitsComponent } from "../components/visits/visits.component";
import { FavComponent } from "../components/fav/fav.component";
import { AccountComponent } from "../components/account/account.component";

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
        canActivate: [AuthGuard],
        children: 
        [
           {
               path: "browser",
               outlet: "browserTab",
               component: BrowserComponent,
           },
           {
              path: "visits",
              outlet: "visitsTab",
              component: VisitsComponent,
           },
           {
              path: "fav",
              outlet: "favTab",
              component: FavComponent,
           },
           {
              path: "account",
              outlet: "accountTab",
              component: AccountComponent,
           }
       ]   
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: false })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
