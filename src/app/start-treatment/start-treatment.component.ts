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
  searchform: FormGroup;
  patientInTerapy: any;
  handSide: any;
  noTreatment: any;
 

    constructor(private service: TreatmentService, fb: FormBuilder) {
    this.form = fb.group({
        oldDate: [''],
        newDate: ['', Validators.required],
        oldDurationTime: [''],
        newDurationTime: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        oldBubbleTimeOut: [''],
        newBubbleTimeOut: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        oldHand: [''],
        //newHand: ['', Validators.required],
       
    });

    this.searchform = fb.group({
      searchInput:  ['', Validators.required],
    });

    this.handSide = "left";
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
  get newHand() {return this.handSide;}

  get searchInput() {return this.searchform.get('searchInput');}



  set oldDate(value) { this.form.get('oldDate').setValue(value);}
  set newDate(value) { this.form.get('newDate').setValue(value);}
  set oldDurationTime(value) { this.form.get('oldDurationTime').setValue(value);}
  set newDurationTime(value) { this.form.get('newDurationTime').setValue(value);}
  set oldBubbleTimeOut(value) { this.form.get('oldBubbleTimeOut').setValue(value);}
  set newBubbleTimeOut(value) { this.form.get('newBubbleTimeOut').setValue(value);}
  set oldHand(value) { this.form.get('oldHand').setValue(value);}
  // set newHand() {return this.handSide;}

  set searchInput(value) {this.searchform.get('searchInput').setValue(value);}


  onSearchID(){
          var idObject = {params:
            {id: this.searchInput.value}
        };

      this.noTreatment=null;
        
      console.log(idObject);
      this.patientInTerapy = idObject.params.id;
      console.log("the patient id: "+  this.patientInTerapy)
      this.form.controls['oldDate'].setValue(null);
      this.form.controls['oldDurationTime'].setValue(null);
      this.form.controls['oldBubbleTimeOut'].setValue(null);
      this.form.controls['oldHand'].setValue(null);

      this.form.controls['newDate'].setValue(null);
      this.form.controls['newDurationTime'].setValue(null);
      this.form.controls['newBubbleTimeOut'].setValue(null);

      this.service.getOne(idObject).subscribe(patient => {
      console.log(patient);
      console.log("####");
      // if(patient == 'noTreatYet')
      // {
      //   console.log("5554444666");
      //   var type = 'primary';
      //   var message = "History of treatment's is not exist for this patient yet. This is his first treatment!"
      //   Utils.showNotification('error', message, type);
      // }
      if(patient=="noTreat")
      {
        console.log("333");
        this.noTreatment = "This patient has no treatment history yet!";
   
      }
      else if(patient != null)
      {
        console.log("111");
        this.form.controls['oldDate'].setValue(patient.treatment_time.slice(0,10));
        this.form.controls['oldDurationTime'].setValue(patient.treatment_duration);
        this.form.controls['oldBubbleTimeOut'].setValue(patient.bubble_timeout);
        this.form.controls['oldHand'].setValue(patient.hand_in_therapy);

        //this.form.controls['newDate'].setValue(patient.treatment_time.slice(0,10));
        this.form.controls['newDurationTime'].setValue(patient.treatment_duration);
        this.form.controls['newBubbleTimeOut'].setValue(patient.bubble_timeout);
        
      }
      
      else{
        console.log("555");
      }
      }, (error: AppError)=>{

          console.log("here");
          var type = 'danger';
          var message = "Patient Is Not Exists, Enter ID Again."
          Utils.showNotification('error', message, type); 
      });
  }

  onClickStart(){
    this.noTreatment=null;
    var x = this.form.value;
    x['newHand']=this.handSide;
    console.log(x);
    console.log("&^&^&"+this.searchInput.value);
       if(this.searchInput.value!= null)
       {
            var treatmentOject = {id: this.patientInTerapy,
                                 patientDetails: this.form.value};

            console.log(treatmentOject);
            this.service.create(treatmentOject).subscribe(patient => {
           if(patient!=null){
              var type = 'success';
            var message = "The Patient Can Start The Treatment Now"
            Utils.showNotification('play_circle_filled', message, type);
           }
           else{
            var type = 'danger';
            var message = "This patient's Id is not exist in our department"
            Utils.showNotification('error', message, type);
           }
        }, (error: AppError) => {
            var type = 'danger';
            var message = ""
            Utils.showNotification('error', message, type);
          
        });
      }
      else
      {
        console.log("no id");
        var type = 'danger';
        var message = "Please Enter Patient ID"
        Utils.showNotification('error', message, type); 
      }
    };


    pickHand(event)
    {
      this.handSide=event;
      console.log(this.handSide);
    }
  

}

