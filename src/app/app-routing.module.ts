import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { LoginComponent } from "../Components/login/login.component";
import { AuthGuard } from "../auth-guard.service";
import { LoginGuard } from "../login-guard.service";

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
        path: "tabs",
        loadChildren: () => import("../Components/menu/menu.module").then((m) => m.MenuModule),
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
