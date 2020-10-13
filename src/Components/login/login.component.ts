import { Component, OnInit } from '@angular/core';
import { isAndroid } from "@nativescript/core/platform";
import { Page } from "@nativescript/core/ui/page";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

  ngOnInit(): void {
  }

}
