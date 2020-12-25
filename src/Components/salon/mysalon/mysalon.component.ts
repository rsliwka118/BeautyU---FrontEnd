import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Visit } from "../../../shared/salon/visit.model"
import { HttpGetService } from "../../../shared/http/http-get.service";
import { Config } from "../../../shared/config";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { ToastsService } from "../../../shared/toasts.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "@nativescript/angular";
import { Route } from "@angular/compiler/src/core";
import { MySalonService } from "../../../shared/salon/mysalon.service";

@Component({
  selector: 'ns-mysalon',
  templateUrl: './mysalon.component.html',
  styleUrls: ['./mysalon.component.css']
})
export class MySalonComponent implements OnInit {

  public salons: Array<Visit>
  public salonsEmpty: boolean

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private get: HttpGetService,
    private post: HttpPostService,
    private toast: ToastsService,
    private routerExtensions: RouterExtensions,
    public salon: SalonService,
    public mysalon: MySalonService,
    private page: Page) {
      this.page.actionBarHidden = false;
      this.salonsEmpty = false

  }

  public showAddSalon(){
    this.routerExtensions.navigate(['/menu/add'])
  }

  private getMySalons(){
    this.get.getData(Config.apiAppURL + "/mysalons", true)
    .subscribe( (res: any) => {
      this.salons = res

      this.salonsEmpty = ( this.salons.length ) ? true : false

    })
  }

  public getType(type): string {
    let types = ["Hairdresser","Barber","Beautician","Nails","Massager","Depilation"]
    let typesPL = ["Fryzjer","Barber","Makijaż","Paznokcie","Masaż","Depilacja"]
    let typePL

    for(let i in types) {
       if( types[i] === type ) typePL = typesPL[i]
    }
    
    return typePL
  }

  ngOnInit(): void {
    this.getMySalons()
  }
}
