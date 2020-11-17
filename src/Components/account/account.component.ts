import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/auth.service'

@Component({
  selector: 'ns-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page) {

  }

  ngOnInit(): void {

  }

}
