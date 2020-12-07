import { Component, OnInit, ViewContainerRef } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Salon } from "../../../shared/salon/salon.model";
import { EventData, ListView, ObservableArray, Switch } from "@nativescript/core";
import { ActivatedRoute } from "@angular/router";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular";

import { RatingComponent } from "../../modals/rating/rating.component";

@Component({
  selector: 'ns-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {

  public salon: Salon
  public hours
  private sub: any
  id: string
  
  public days = ["PN","WT","ŚR","CZW","PT","SO","ND"]
  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private route: ActivatedRoute,
    private page: Page,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,
    public salonService: SalonService) {
      this.page.actionBarHidden = false;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.salonService.getSalon(this.id).subscribe( (res: any) => {
        this.salon = res.salon
        this.salon.services = res.services
        this.hours = this.salonService.getHours(this.salon.hours)
      })
   })
  }

  onCheckedChange(args: EventData) {
    let sw = args.object as Switch;
    let isChecked = sw.checked; // boolean
  }

  rate(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    }
    this.modalService.showModal(RatingComponent, options);
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
