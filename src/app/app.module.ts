import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "../components/login/login.component";
import { ValidationService } from "../shared/validation.service";
import { AuthService } from "../shared/auth.service";
import { ToastsService } from "../shared/toasts.service";
import { HttpPostService } from "../shared/http/http-post.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "../auth-guard.service";
import { LoginGuard } from "../login-guard.service";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        ValidationService,
        AuthService,
        HttpPostService,
        ToastsService,
        [AuthGuard],
        [LoginGuard]
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
