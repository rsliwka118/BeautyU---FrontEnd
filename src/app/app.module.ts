import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "../components/main/login/login.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthGuard } from "../auth-guard.service";
import { LoginGuard } from "../login-guard.service";

import { SalonService } from "../shared/salon/salon.service";
import { UserService } from "../shared/user/user.service"
import { ValidationService } from "../shared/auth/validation.service";
import { AuthService } from "../shared/auth/auth.service";
import { AccountService } from "../shared/auth/account.service";
import { ToastsService } from "../shared/toasts.service";

import { HttpPostService } from "../shared/http/http-post.service";
import { HttpGetService } from "../shared/http/http-get.service";
import { HttpDeleteService } from "../shared/http/http-delete.service";
import { HttpInterceptorService } from "../shared/http/http-interceptor.service";
import { AuthInterceptor } from "../shared/http/auth-interceptor.service";
import { BrowserComponent } from "../components/other/browser/browser.component";
import { MenuComponent } from "../components/other/menu/menu.component";
import { VisitsComponent } from "../components/other/visits/visits.component";
import { FavComponent } from "../components/other/fav/fav.component";
import { AccountComponent } from "../components/other/account/account.component";
import { CategoryComponent } from "../components/other/category/category.component";
import { SalonDetailsComponent } from "../components/other/salon-details/salon-details.component";
import { WelcomeComponent } from "../components/other/welcome/welcome.component";
import { RatingComponent } from "../components/modals/rating/rating.component";
import { LocationComponent } from "../components/modals/location/location.component";
import { NgRippleModule } from 'nativescript-ripple/angular';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NgRippleModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        MenuComponent,
        BrowserComponent,
        VisitsComponent,
        FavComponent,
        AccountComponent,
        CategoryComponent,
        SalonDetailsComponent,
        RatingComponent,
        LocationComponent,
        WelcomeComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
        ValidationService,
        AuthService,
        AccountService,
        SalonService,
        HttpPostService,
        HttpGetService,
        UserService,
        HttpDeleteService,
        ToastsService,
        [AuthGuard],
        [LoginGuard]
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
