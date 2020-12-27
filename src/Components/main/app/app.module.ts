import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalDialogService, NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule, NativeScriptModule } from "@nativescript/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

import { AppRoutingModule } from "./app-routing.module";
import { NgRippleModule } from 'nativescript-ripple/angular';
import { NativeScriptDateTimePickerModule } from "@nativescript/datetimepicker/angular";


import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthGuard } from "../../../shared/guards/auth-guard.service";
import { LoginGuard } from "../../../shared/guards/login-guard.service";
import { AccountTypeGuard } from "../../../shared/guards/account-type-guard.service";

import { SalonService } from "../../../shared/salon/salon.service";
import { UserService } from "../../../shared/user/user.service"
import { ValidationService } from "../../../shared/auth/validation.service";
import { AuthService } from "../../../shared/auth/auth.service";
import { AccountService } from "../../../shared/auth/account.service";
import { ToastsService } from "../../../shared/toasts.service";
import { DateService } from "../../../shared/date/date.service";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { HttpGetService } from "../../../shared/http/http-get.service";
import { HttpDeleteService } from "../../../shared/http/http-delete.service";
import { HttpInterceptorService } from "../../../shared/http/http-interceptor.service";
import { MySalonService } from "../../../shared/salon/mysalon.service"
import { AddSalonService } from "../../../shared/salon/add-salon.service"
import { DashboardService } from "../../../shared/salon/dashboard.service"
import { AuthInterceptor } from "../../../shared/http/auth-interceptor.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "../../../components/main/login/login.component";
import { BrowserComponent } from "../../../components/other/browser/browser.component";
import { MenuComponent } from "../menu/menu.component";
import { VisitsComponent } from "../../../components/other/visits/visits.component";
import { FavComponent } from "../../../components/other/fav/fav.component";
import { AccountComponent } from "../../../components/other/account/account.component";
import { CategoryComponent } from "../../../components/other/category/category.component";
import { SalonDetailsComponent } from "../../../components/other/salon-details/salon-details.component";
import { WelcomeComponent } from "../../../components/other/welcome/welcome.component";
import { RatingComponent } from "../../../components/modals/rating/rating.component";
import { SetSalonTypeComponent } from "../../../components/modals/set-salon-type/set-salon-type.component";
import { SetSalonServiceComponent } from "../../../components/modals/set-salon-service/set-salon-service.component";
import { AddServiceComponent } from "../../../components/modals/set-salon-service/add-service/add-service.component";
import { LocationComponent } from "../../../components/modals/location/location.component";
import { SearchComponent } from "../../other/search/search.component";
import { ReservationComponent } from "../../other/reservation/reservation.component";
import { MySalonComponent } from "../../salon/mysalon/mysalon.component"
import { AddSalonComponent } from "../../salon/add-salon/add-salon.component"
import { FloatButtonComponent } from "../../modals/float-btn/float-btn.component"
import { MySalonDetailsComponent } from "../../salon/mysalon-details/mysalon-details.component"
import { EditHoursComponent } from "../../modals/edit-hours/edit-hours.component"
import { EditInfoComponent } from "../../modals/edit-info/edit-info.component"

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        NativeScriptUIChartModule,
        NativeScriptDateTimePickerModule,
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
        WelcomeComponent,
        SearchComponent,
        ReservationComponent,
        MySalonComponent,
        FloatButtonComponent,
        AddSalonComponent,
        SetSalonTypeComponent,
        SetSalonServiceComponent,
        AddServiceComponent,
        MySalonDetailsComponent,
        EditHoursComponent,
        EditInfoComponent
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
        ModalDialogService,
        ValidationService,
        AuthService,
        AccountService,
        SalonService,
        HttpPostService,
        HttpGetService,
        UserService,
        HttpDeleteService,
        ToastsService,
        DateService,
        AddSalonService,
        MySalonService,
        DashboardService,
        [AuthGuard],
        [LoginGuard],
        [AccountTypeGuard]
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
