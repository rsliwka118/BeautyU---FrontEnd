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
    private page: Page) {
      this.page.actionBarHidden = false;
      this.salonsEmpty = false

  }

  public showAddSalon(){
    this.routerExtensions.navigate(['/menu/add'])
  }

  public getServiceName(item: any){
    return item.serviceID.offerTitle + " | " + item.serviceID.price +"zł"
  }

  public getDay(date){
    let day = date.split("-")
    return day[2]
  }

  public getMonth(date){
    let month = date.split("-")
    let mm = parseInt(month[1])
    
    let months = ["STY","LUT","MAR","KWI","MAJ","CZE","LIP","SIE","WRZ","PAŹ","LIS","GRU"]

    return mm <= 12 ? months[mm - 1] : "Err"
  }

  public getStatus(status){
      if(status === "Canceled") return "Anulowana"
      if(status === "Scheduled") return "Zaplanowana"
      if(status === "Finished" ) return "Zakończona"
  }

  private getMySalons(){
    this.get.getData(Config.apiAppURL + "/mysalons", true)
    .subscribe( (res: any) => {
      this.salons = res

      this.salonsEmpty = ( this.salons.length ) ? true : false

    })
  }

  public cancelVisit(id){

    dialogs.confirm({
      title: "Anulowanie rezerwacji",
      message: "Czy na pewno chcesz anulować wizytę?",
      okButtonText: "Tak, anuluj wizytę",
      cancelButtonText: "Rozmyśliłem się"
    }).then(result => {

        if(result){
          this.post.postData(Config.apiAppURL + "/visits/status/"+id,{ status: "Canceled"}, true)
          .subscribe( (res: any) => {
            this.toast.showToast(res.message)
          })
          this.auth.reloadComponent()
        }
    })
    
  }

  ngOnInit(): void {
    this.getMySalons()
  }
}
