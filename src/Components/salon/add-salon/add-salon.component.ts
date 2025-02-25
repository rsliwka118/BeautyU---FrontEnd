import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core'
import { Page } from "@nativescript/core/ui/page"
import { ValidationService } from '../../../shared/auth/validation.service'
import { ToastsService } from '../../../shared/toasts.service'
import { AuthService } from '../../../shared/auth/auth.service'
import { AccountService } from '../../../shared/auth/account.service'
import { UserService } from '../../../shared/user/user.service'
import { Button, EventData, ListPicker } from '@nativescript/core'
import { AddSalonService } from '../../../shared/salon/add-salon.service'
import { Toast } from 'nativescript-toast'
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from '@nativescript/angular'
import { SetSalonTypeComponent } from '../../../components/modals/set-salon-type/set-salon-type.component'
import { Salon } from '../../../shared/salon/salon.model'
import { SetSalonServiceComponent } from '../../modals/set-salon-service/set-salon-service.component'
import { DateTimePicker } from "@nativescript/datetimepicker";
import { getString } from '@nativescript/core/application-settings'
import { SalonService } from '../../../shared/salon/salon.service'

@Component({
  selector: 'ns-add-salon',
  templateUrl: './add-salon.component.html',
  styleUrls: ['./add-salon.component.css']
})
export class AddSalonComponent implements OnInit {

  nameError = ""
  typeError = ""
  describeError = ""
  cityError = ""
  zipCodeError = ""
  streetError = ""
  houseNumberError = ""

  nameFocus = false
  cityFocus = false
  zipCodeFocus = false
  streetFocus = false
  describeFocus = false
  houseNumberFocus = false
  
  pageNumber: number
  scrollView: any
  
  constructor(
    public auth: AuthService,
    public account: AccountService, 
    public userService: UserService,
    private routerExtensions: RouterExtensions,
    public salon: AddSalonService,
    private salonService: SalonService,
    private page: Page,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, 
    public validService: ValidationService, 
    public toast: ToastsService
    ) {
          this.pageNumber = 0
      }

  ngOnInit(): void {
    this.page.actionBarHidden = false
  }

  public showTypeModal(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    }
    this.modalService.showModal(SetSalonTypeComponent, options);
  }

  public showServices(id){
    this.salonService.isMySalon = false
    this.routerExtensions.navigate(['/menu/services/',id])
  }

  public onPickTimeTap(args: EventData, day, isOpen): void {
    const dateToday = new Date();
    const dateTomorrow = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 1);
    dateTomorrow.setHours(8);
    dateTomorrow.setMinutes(0);
    DateTimePicker.pickTime({
        context: (<Button>args.object)._context,
        time: dateTomorrow,
        okButtonText: "OK",
        cancelButtonText: "Cofnij",
        title: isOpen ? "Godzina otwarcia" : "Godzina zamknięcia",
        locale: "en_GB",
        is24Hours: true
    }).then((selectedTime: Date) => {
      
        if (selectedTime) {
            let hour = this.getFormattedTime(selectedTime);
            
            if(isOpen) this.salon.hours[day].open = hour
            else this.salon.hours[day].close = hour
        }
    })
  }
  
  public getHour(day, isOpen): string {
    if(isOpen) 
      return this.salon.hours[day].open.length ? this.salon.hours[day].open : "Otwarcie"
    else
      return this.salon.hours[day].close.length ? this.salon.hours[day].close : "Zamknięcie" 
  } 

  public resetHour(day) {
      this.salon.hours[day].open = ""
      this.salon.hours[day].close = ""
  }

  getFormattedTime(date: Date): string {
    const h = date.getHours();
    const m = date.getMinutes();
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  public nameErrors() {
    const errorMsg = !!this.nameError
    if (!errorMsg) return false

    const isValidName = this.salon.salon.name.length > 4
    let error = errorMsg || !isValidName

    if (isValidName) {

      this.nameError = ""
      return false

    }
    return error
  }

  public cityErrors() {
    const errorMsg = !!this.cityError
    if (!errorMsg) return false

    const isValidCity = this.salon.salon.location.city.length > 0
    let error = errorMsg || !isValidCity

    if (isValidCity) {

      this.cityError = ""
      return false

    }
    return error
  }

  public zipCodeErrors() {
    const errorMsg = !!this.zipCodeError
    if (!errorMsg) return false

    const isValidZipCode = this.salon.salon.location.code.length > 0 && this.validService.isValidZipCode(this.salon.salon.location.code)
    let error = errorMsg || !isValidZipCode

    if (isValidZipCode) {

      this.zipCodeError = ""
      return false

    }
    return error
  }

  public describeErrors() {
    const errorMsg = !!this.describeError
    if (!errorMsg) return false

    const isValidDescribe = this.salon.salon.describe.length > 0
    let error = errorMsg || !isValidDescribe

    if (isValidDescribe) {

      this.describeError = ""
      return false

    }
    return error
  }

  public streetErrors() {
    const errorMsg = !!this.streetError
    if (!errorMsg) return false

    const isValidStreet = this.salon.salon.location.street.length > 0
    let error = errorMsg || !isValidStreet

    if (isValidStreet) {

      this.streetError = ""
      return false

    }
    return error
  }

  public houseNumberErrors() {
    const errorMsg = !!this.houseNumberError
    if (!errorMsg) return false

    const isValidHouseNumber = this.salon.salon.location.houseNumber.length > 0
    let error = errorMsg || !isValidHouseNumber

    if (isValidHouseNumber) {

      this.houseNumberError = ""
      return false

    }
    return error
  }

  public typeErrors() {
    const errorMsg = !!this.typeError
    if (!errorMsg) return false

    const isValidType = this.salon.salon.type.length > 0
    let error = errorMsg || !isValidType

    if (isValidType) {

      this.typeError = ""
      return false

    }
    return error
  }

  updateErrors() {

    if( this.salon.salon.hasName() ) {

        if(this.salon.salon.name.length >= 5) this.nameError = ""
        
        else  this.nameError = "Podaj nazwę salonu | 5-50 znaków"

    } else {
      this.nameError = "Podaj nazwę salonu | 5-50 znaków"
    }

    this.cityError = this.salon.salon.location.hasCity() ? "" : "Podaj miasto"
    this.zipCodeError = ( this.salon.salon.location.hasCode() && this.validService.isValidZipCode(this.salon.salon.location.code))? "" : "np. 66-620"
    this.describeError = this.salon.salon.hasDescribe() ? "" : "Opisz swój salon | do 250 znaków"
    this.streetError = this.salon.salon.location.hasStreet() ? "" : "Podaj ulicę"
    this.houseNumberError = this.salon.salon.location.hashouseNumber() ? "" : "Podaj nr budynku"
    this.typeError = this.salon.salon.hasType() ? "" : "Podaj rodzaj salonu"

  }

  private isValidForm() {
    let isValid

    isValid = ( !!this.nameError || !!this.cityError || 
                !!this.zipCodeError || !!this.streetError || 
                !!this.houseNumberError || !!this.describeError || !!this.typeError )
    
    return !isValid;
  }

  getSalonType() {
    let types = ["Hairdresser","Barber","Beautician","Nails","Massager","Depilation"]
    let typesPL = ["Fryzjer","Barber","Makijaż","Paznokcie","Masaż","Depilacja"]

    for(let i in types) {
        if( types[i] === this.salon.salon.type ) return typesPL[i]
    }
    return ""
  }

  getNameError() {
    return this.nameError
  }

  getCityError() {
    return this.cityError
  }

  getZipCodeError() {
    return this.zipCodeError
  }

  getTypeError() {
    return this.typeError
  }

  getDescribeError() {
    return this.describeError
  }

  getStreetError() {
    return this.streetError
  }

  getHouseNumberError() {
    return this.houseNumberError
  }

  next(){
    if( this.isValidForm() ) this.pageNumber += 1
    else this.toast.showToast("Wypełnij pola poprawnie")
  }

  undo(){
    this.pageNumber -= 1
  }

  addSalon(){
     this.salon.addNewSalon().subscribe( (res: any) => {
       this.salonService.salonID = res.id
       this.toast.showToast(res.message)
       this.showServices(this.salonService.salonID)
     })
  }

  submit() {

    this.updateErrors()

    if(this.isValidForm()) {
        this.updateErrors()
        this.next()
    }
  
  }

}
