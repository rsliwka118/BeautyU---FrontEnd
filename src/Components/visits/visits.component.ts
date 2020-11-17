import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/auth/auth.service'

@Component({
  selector: 'ns-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page) {

  }

  ngOnInit(): void {

  }

}
