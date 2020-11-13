import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "../Components/login/login.component";
import { BrowserComponent } from "../Components/browser/browser.component";
import { ValidationService } from "../shared/validation.service";
import { AuthService } from "../shared/token/auth.service";
import { ToastsService } from "../shared/toasts.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "../auth-guard.service";

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
        LoginComponent,
        BrowserComponent
    ],
    providers: [
        ValidationService,
        AuthService,
        ToastsService,
        [AuthGuard]
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
