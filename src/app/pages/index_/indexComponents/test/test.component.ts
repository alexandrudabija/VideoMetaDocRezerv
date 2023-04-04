import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class TestComponent  {
  stepperOrientation: Observable<StepperOrientation>;
  testShow: boolean = false;


  constructor(private FormBuilder: FormBuilder, private TestService: TestService, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
   }


  firstFormGroup = this.FormBuilder.group({
    firstCtrl: ['', Validators.required],
  })
  secondFormGroup = this.FormBuilder.group({
    secondCtrl: ['', Validators.required],
  })
  thirdFormGroup = this.FormBuilder.group({
    thirdCtrl: ['', Validators.required],
  })

  // fourthFormGroup = this.FormBuilder.group({
  //    fourthCtrl: ['', Validators.required],
  // })

 personalData= this.FormBuilder.group({
        name: ['', Validators.required],
   phone: ['', [Validators.required, Validators.pattern('[- +()0-9]{9,12}')],],
   location: ['', Validators.required]
      })




  testInit(): void {
    this.testShow = true;
  }



  finishTest(): void {


    this.TestService.sendResult(
      {

        firstCtrl: this.firstFormGroup.value.firstCtrl!,
        secondCtrl:  this.secondFormGroup.value.secondCtrl!,
        thridCtrl:  this.thirdFormGroup.value.thirdCtrl!,
        location: this.personalData.value.location!,
        name: this.personalData.value.name!,
        phone: this.personalData.value.phone!
      }
    );

  }




  readonly questionsArray: Array<{ question: string, answers: Array<{ answer: string }> }> = [
    {
      question: 'De câte camere aveți necesitate?',

      answers: [
        {
          answer: '1',
        },

        {
          answer: '4',
        },

        {
          answer: '5',
        },

        {
          answer: '8+',
        },

        {
          answer: 'Nu știu, am nevoie de o consultație',
        },
      ],
    },
    {
      question: 'Pentru cati metri patrati aveti nevoie  ?',

      answers: [
        {
          answer: '24m3',
        },

        {
          answer: '10m3',
        },

        {
          answer: '15m3',
        },

        {
          answer: '20m3',
        },

        {
          answer: 'Nu știu, am nevoie de o consultație',
        },
      ],
    },

    {
      question: 'Ce model de camera   ?',

      answers: [
        {
          answer: 'samz',
        },

        {
          answer: 'Zara',
        },

        {
          answer: 'Yama',
        },

        {
          answer: 'hekinson',
        },

        {
          answer: 'Nu știu, am nevoie de o consultație',
        },
      ],
    },
  ];
}
