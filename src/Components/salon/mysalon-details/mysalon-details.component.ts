import { Component, OnInit, ViewContainerRef } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { ActivatedRoute } from "@angular/router";
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { MySalonService } from "../../../shared/salon/mysalon.service";
import { EditHoursComponent } from "../../../components/modals/edit-hours/edit-hours.component";
import { EditInfoComponent } from "../../../components/modals/edit-info/edit-info.component";
import { DateService } from "../../../shared/date/date.service";
import { Config } from "../../../shared/config";
import { HttpPostService } from "../../../shared/http/http-post.service";
import { ToastsService } from "../../../shared/toasts.service";
import { DashboardService } from "../../../shared/salon/dashboard.service";
import { ObservableArray } from "@nativescript/core";

@Component({
  selector: 'ns-mysalon-details',
  templateUrl: './mysalon-details.component.html',
  styleUrls: ['./mysalon-details.component.css']
})
export class MySalonDetailsComponent implements OnInit {

  public hours
  private subDetails: any
  private subVisits: any
  private subDashboard: any
  private id: string
  public tabNumber: number
  public visitTabNumber: number
  public visitsEmpty = false
  public data = [
    { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
    { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
    { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
    { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
    { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
  ]
  private _pieSource: ObservableArray<any>

  public days = ["PN","WT","ŚR","CZW","PT","SO","ND"]
  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private page: Page,
    public dash: DashboardService,
    public dateService: DateService,
    private modalService: ModalDialogService,
    private post: HttpPostService,
    private toast: ToastsService,
    private viewContainerRef: ViewContainerRef,
    public salonService: MySalonService,
    public salon: SalonService) {
      
      this.page.actionBarHidden = false
      this.tabNumber = 0
      this.visitTabNumber = 0

  }

  ngOnInit(): void {

    this._pieSource = new ObservableArray(this.dash.getRateSource())

    this.dateService.getDays(true)

    this.subDetails = this.route.params.subscribe(params => {
      this.salonService.salonID = params['id']
      this.salon.getSalon(this.salonService.salonID).subscribe( (res: any) => {
        this.salonService.salon = res.salon

        this.hours = this.salon.getHours(this.salonService.salon.hours)

        for(let i in this.hours){
          this.salonService.hours[i].open = this.hours[i][0]
          this.salonService.hours[i].close = this.hours[i][1]
        }

        this.salonService.salon.services = res.services
      })
   })
  }
  
  get pieSource(): ObservableArray<any> {
    return this._pieSource
  }

  public canUndo() {
    let date = new Date()
    return this.dateService.compareDates( date, this.dateService._dateCurrent )
  }

  public showMore():boolean {
    if(this.salonService.salon.services.length > 2) return true
    else false

  }

  public editInfo() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    }
    this.modalService.showModal(EditInfoComponent, options)
  }

  public editHours() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    }
    this.modalService.showModal(EditHoursComponent, options)
  }

  public editServices() {
    this.salon.isMySalon = true
    this.routerExtensions.navigate(['/menu/services', this.salonService.salonID])
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

  public getServiceName(item: any){
    return item.serviceID.offerTitle + " | " + item.serviceID.price +"zł"
  }

  public cancelVisit(id){

    dialogs.confirm({
      title: "Anulowanie rezerwacji",
      message: "Czy na pewno chcesz anulować wizytę?",
      okButtonText: "Tak, anuluj wizytę",
      cancelButtonText: "Cofnij"
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

  public doneVisit(id){

    dialogs.confirm({
      title: "Wizyta zakończona",
      message: "Czy na pewno chcesz oznaczyć wizytę jako zakończoną?",
      okButtonText: "Tak, wizyta zakończona",
      cancelButtonText: "Cofnij"
    }).then(result => {

        if(result){
          this.post.postData(Config.apiAppURL + "/visits/status/"+id,{ status: "Finished"}, true)
          .subscribe( (res: any) => {
            this.toast.showToast(res.message)
          })
          this.auth.reloadComponent()
        }
    })
    
  }

  ngOnDestroy() {
    this.subDetails.unsubscribe()
  }

}
