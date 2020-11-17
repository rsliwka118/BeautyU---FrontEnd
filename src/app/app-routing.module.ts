import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "@nativescript/angular";
import { LoginComponent } from "../components/login/login.component";
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
        path: "menu",
        loadChildren: () => import("../components/menu/menu.module").then((m) => m.MenuModule),
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
