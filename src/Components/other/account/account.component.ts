import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'

@Component({
  selector: 'ns-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private page: Page) {
      this.page.actionBarHidden = false;
  }

  ngOnInit(): void {

  }

}
