import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { BrowserComponent } from "../Components/browser/browser.component";
import { LoginComponent } from "../Components/login/login.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full"},
    { path: "login", component: LoginComponent },
    { path: "browser", component: BrowserComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
