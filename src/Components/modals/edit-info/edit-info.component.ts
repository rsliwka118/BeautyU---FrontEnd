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
import { ModalDialogOptions, ModalDialogParams, ModalDialogService, RouterExtensions } from '@nativescript/angular'
import { SetSalonTypeComponent } from '../set-salon-type/set-salon-type.component'
import { Salon } from '../../../shared/salon/salon.model'
import { SetSalonServiceComponent } from '../set-salon-service/set-salon-service.component'
import { DateTimePicker } from "@nativescript/datetimepicker";
import { getString } from '@nativescript/core/application-settings'
import { SalonService } from '../../../shared/salon/salon.service'
import { MySalonService } from '../../../shared/salon/mysalon.service'

@Component({
  selector: 'ns-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

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
    public salon: MySalonService,
    private modalService: ModalDialogService,
    private page: Page,
    private params: ModalDialogParams,
    private viewContainerRef: ViewContainerRef, 
    public validService: ValidationService, 
    public toast: ToastsService
    ) {
          this.pageNumber = 0
      }

  ngOnInit(): void {
  }

  public showTypeModal(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    }
    this.modalService.showModal(SetSalonTypeComponent, options);
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

    if( this.salon.salon.name.length !== 0 ) {

        if(this.salon.salon.name.length >= 5) this.nameError = ""
        
        else  this.nameError = "Podaj nazwę salonu | 5-50 znaków"

    } else {
      this.nameError = "Podaj nazwę salonu | 5-50 znaków"
    }

    this.cityError = this.salon.salon.location.city.length != 0 ? "" : "Podaj miasto"
    this.zipCodeError = ( this.salon.salon.location.code.length != 0 && this.validService.isValidZipCode(this.salon.salon.location.code))? "" : "np. 66-620"
    this.describeError = this.salon.salon.describe.length != 0 ? "" : "Opisz swój salon | do 250 znaków"
    this.streetError = this.salon.salon.location.street.length != 0 ? "" : "Podaj ulicę"
    this.houseNumberError = this.salon.salon.location.houseNumber.length != 0 ? "" : "Podaj nr budynku"
    this.typeError = this.salon.salon.type.length != 0 ? "" : "Podaj rodzaj salonu"

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
    if( this.isValidForm() ) { 
      this.salon.updateInfo().subscribe( (res:any) =>{
        this.toast.showToast(res.message)
      })
      this.close()
      this.auth.reloadComponent()
    }
    else this.toast.showToast("Wypełnij pola poprawnie")
  }

  submit() {

    this.updateErrors()

    if(this.isValidForm()) {
        this.updateErrors()
        this.next()
    }
  
  }

  close() {
    this.params.closeCallback()
  }

}
