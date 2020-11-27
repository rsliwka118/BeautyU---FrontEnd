import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { LoginComponent } from "../components/main/login/login.component";
import { AuthGuard } from "../auth-guard.service";
import { LoginGuard } from "../login-guard.service";
import { MenuComponent } from "../components/other/menu/menu.component";
import { BrowserComponent } from "../components/other/browser/browser.component";
import { VisitsComponent } from "../components/other/visits/visits.component";
import { FavComponent } from "../components/other/fav/fav.component";
import { AccountComponent } from "../components/other/account/account.component";
import { CategoryComponent } from '../components/other/category/category.component';

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
                path: "category",
                component: CategoryComponent
            },
            {
                path: "browser",
                component: BrowserComponent,
            },
            {
                path: "visits",
                component: VisitsComponent
            },
            {
                path: "fav",
                component: FavComponent
            },
            {
                path: "account",
                component: AccountComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'browser'
            }
       ]   
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
