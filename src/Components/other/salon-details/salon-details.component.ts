import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Salon } from "../../../shared/salon/salon.model";
import { ListView, ObservableArray } from "@nativescript/core";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'ns-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css']
})
export class SalonDetailsComponent implements OnInit {

  public salon: Salon
  private sub: any;
  id: string;

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private route: ActivatedRoute,
    private page: Page,
    public salonService: SalonService) {
      this.page.actionBarHidden = false;
  }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']
      this.salonService.getSalon(this.id).subscribe( (res: any) => {
        this.salon = res; 
      })
   })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
