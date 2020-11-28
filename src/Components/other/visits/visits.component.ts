import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'

@Component({
  selector: 'ns-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    public salon: SalonService,
    private page: Page) {
      this.page.actionBarHidden = false;

  }

  ngOnInit(): void {
  }

}
