import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AccountService } from "../../shared/auth/account.service"
import { AuthService } from '../../shared/auth/auth.service'

@Component({
  selector: 'ns-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private page: Page) {

  }

  ngOnInit(): void {

  }

}
