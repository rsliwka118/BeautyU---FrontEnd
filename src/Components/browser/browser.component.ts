import { Component, Injectable, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { AuthService } from '../../shared/auth/auth.service'

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'ns-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  constructor(public auth: AuthService, private page: Page) {

  }

  ngOnInit(): void {

  }

}
