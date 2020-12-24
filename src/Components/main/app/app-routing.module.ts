import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { LoginComponent } from "../../../components/main/login/login.component";
import { AuthGuard } from "../../../shared/guards/auth-guard.service";
import { LoginGuard } from "../../../shared/guards/login-guard.service";
import { AccountTypeGuard } from "../../../shared/guards/account-type-guard.service";
import { MenuComponent } from "../menu/menu.component";
import { BrowserComponent } from "../../../components/other/browser/browser.component";
import { VisitsComponent } from "../../../components/other/visits/visits.component";
import { FavComponent } from "../../../components/other/fav/fav.component";
import { AccountComponent } from "../../../components/other/account/account.component";
import { CategoryComponent } from '../../../components/other/category/category.component';
import { SalonDetailsComponent } from "../../../components/other/salon-details/salon-details.component";
import { WelcomeComponent } from "../../../components/other/welcome/welcome.component";
import { SearchComponent } from "../../other/search/search.component";
import { ReservationComponent } from "../../other/reservation/reservation.component";
import { MySalonComponent } from "../../../components/salon/mysalon/mysalon.component";
import { AddSalonComponent } from "../../../components/salon/add-salon/add-salon.component";
import { SetSalonServiceComponent } from "../../../components/modals/set-salon-service/set-salon-service.component";

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
        path: "settings", 
        component: WelcomeComponent
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
                path: "details/:id",
                component: SalonDetailsComponent
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
                path: "search",
                component: SearchComponent 
            },
            {
                path: "reservation",
                component: ReservationComponent
            },
            {
                path: "add",
                canActivate: [AccountTypeGuard],
                component: AddSalonComponent
            },
            {
                path: "salon",
                canActivate: [AccountTypeGuard],
                component: MySalonComponent
            },
            {
                path: "services/:id",
                canActivate: [AccountTypeGuard],
                component: SetSalonServiceComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'services/9b6dcf95-d13a-4ae8-8d60-0a087ec5247d'
            }
       ]   
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: false })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
