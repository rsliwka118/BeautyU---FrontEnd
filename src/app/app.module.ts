import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "../Components/login/login.component";
import { UserService } from "../shared/user/user.service";
import { HttpClientModule } from "@angular/common/http";

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
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
