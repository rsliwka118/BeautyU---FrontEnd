import { Component, OnInit, ViewContainerRef } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { ActivatedRoute } from "@angular/router";
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";

import { RatingComponent } from "../../modals/rating/rating.component";
// import { EditHoursComponent } from "../../../components/modals/edit-hours/edit-hours.component";
import { MySalonService } from "../../../shared/salon/mysalon.service";
import { EditHoursComponent } from "../../../components/modals/edit-hours/edit-hours.component";
import { EditInfoComponent } from "../../../components/modals/edit-info/edit-info.component";

@Component({
  selector: 'ns-mysalon-details',
  templateUrl: './mysalon-details.component.html',
  styleUrls: ['./mysalon-details.component.css']
})
export class MySalonDetailsComponent implements OnInit {

  public hours
  private sub: any
  id: string
  tabNumber: number

  public days = ["PN","WT","ŚR","CZW","PT","SO","ND"]
  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private page: Page,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    public salonService: MySalonService,
    public salon: SalonService) {
      
      this.page.actionBarHidden = false
      this.tabNumber = 2

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.salon.getSalon(this.id).subscribe( (res: any) => {
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
    this.routerExtensions.navigate(['/menu/services', this.id])
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
