import { Component, OnInit } from "@angular/core"
import { Page } from "@nativescript/core/ui/page"
import { SalonService } from "../../../shared/salon/salon.service";
import { AccountService } from "../../../shared/auth/account.service"
import { AuthService } from '../../../shared/auth/auth.service'
import { Salon } from "../../../shared/salon/salon.model";
import { ListView, ObservableArray } from "@nativescript/core";
@Component({
  selector: 'ns-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(
    public auth: AuthService, 
    public account: AccountService,
    private page: Page,
    private salon: SalonService) {
      this.page.actionBarHidden = false;
  }
  public salons: Array<Salon>;
  
  public onItemTap(args) {
    console.log("------------------------ ItemTapped: " + args.index);
   
  }

  ngOnInit(): void {
    this.salon.getSalons().subscribe( (res: any) => {
      this.salons = res.salons;
    });
  }

}
