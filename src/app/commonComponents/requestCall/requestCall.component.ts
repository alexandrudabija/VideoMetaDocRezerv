import { Component, OnInit } from '@angular/core';
import { RequestCallService } from 'src/app/services/requestCall.service';
import { FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormGroup | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-requestCall',
  templateUrl:'./requestCall.component.html',
  styleUrls: ['./requestCall.component.less']
})
export class RequestCallComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  showRequestCall: boolean = false;
  formCall!: FormGroup

  constructor(private RequestCallService: RequestCallService,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formCall = this.formBuilder.group({

      name: [null, [Validators.required, Validators.min(1)]],
      phone: [null, [Validators.required, Validators.pattern('[- +()0-9]{9,12}')]],
    });
  }
  onRequestCall():void
  {
    this.RequestCallService.requestcall(this.formCall.value);
    this.showRequestCall = false;
  }

  toggleRequestCall(): void {
    this.showRequestCall = !this.showRequestCall;
  }

  get getNameValid()
  {
    return this.formCall.get('name')
  }
  get getPhoneValid() {
    return this.formCall.get('phone')
  }

}
