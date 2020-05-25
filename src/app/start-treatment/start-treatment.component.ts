import { TreatmentService } from 'app/services/treatment.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';

@Component({
  selector: 'app-start-treatment',
  templateUrl: './start-treatment.component.html',
  styleUrls: ['./start-treatment.component.css']
})
export class StartTreatmentComponent implements OnInit {


  form: FormGroup;
  patientInTerapy: any;

    constructor(private service: TreatmentService, fb: FormBuilder) {
    this.form = fb.group({
        oldDate: [''],
        newDate: ['', Validators.required],
        oldDurationTime: [''],
        newDurationTime: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        oldBubbleTimeOut: [''],
        newBubbleTimeOut: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        oldHand: [''],
        newHand: ['', Validators.required],
       
    });
  }
  
  ngOnInit(): void {
    this.form.controls['oldDate'].disable();
    this.form.controls['oldDurationTime'].disable();
    this.form.controls['oldBubbleTimeOut'].disable();
    this.form.controls['oldHand'].disable();
  }

  get oldDate() {return this.form.get('oldDate');}
  get newDate() {return this.form.get('newDate');}
  get oldDurationTime() {return this.form.get('oldDurationTime');}
  get newDurationTime() {return this.form.get('newDurationTime');}
  get oldBubbleTimeOut() {return this.form.get('oldBubbleTimeOut');}
  get newBubbleTimeOut() {return this.form.get('newBubbleTimeOut');}
  get oldHand() {return this.form.get('oldHand');}
  get newHand() {return this.form.get('newHand');}


  onSearchID(patientID){
          var idObject = {params:
            {id: patientID}
        };
      console.log(idObject);
      this.patientInTerapy = patientID;
      this.form.controls['oldDate'].setValue(null);
      this.form.controls['oldDurationTime'].setValue(null);
      this.form.controls['oldBubbleTimeOut'].setValue(null);

      this.form.controls['newDate'].setValue(null);
      this.form.controls['newDurationTime'].setValue(null);
      this.form.controls['newBubbleTimeOut'].setValue(null);

      this.service.getOne(idObject).subscribe(patient => {
      console.log(patient);
      console.log("####");
      if(patient != null)
      {
        console.log("111");
        this.form.controls['oldDate'].setValue(patient.treatment_time.slice(0,10));
        this.form.controls['oldDurationTime'].setValue(patient.treatment_duration);
        this.form.controls['oldBubbleTimeOut'].setValue(patient.bubble_timeout);
        this.form.controls['oldHand'].setValue(patient.hand_in_therapy);
      }
      else {
        console.log("333");
      }
      }, (error: AppError)=>{

          console.log("here");
          var type = 'danger';
          var message = "Patient Is Not Exists"
          Utils.showNotification('error', message, type); 
      });
  }

  onClickStart(){
       console.log(this.patientInTerapy);
       if(this.patientInTerapy!= null)
       {
            var treatmentOject = {id: this.patientInTerapy,
                                 patientDetails: this.form.value};

            console.log(treatmentOject);
            this.service.create(treatmentOject).subscribe(patient => {
            var type = 'success';
            var message = "The Patient Can Start The Treatment Now"
            Utils.showNotification('play_circle_filled', message, type);
        
        }, (error: AppError) => {
            var type = 'danger';
            var message = ""
            Utils.showNotification('error', message, type);
          
        });
      }
    };


  

}
