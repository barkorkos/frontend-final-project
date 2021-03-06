import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from 'app/services/patients.service';
import { Utils } from 'app/utils';
import { BadRequestError } from 'common/bad-request-error';
import { AppError } from 'common/app-error';
// import * as THREE from 'tree';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  form: FormGroup;
  numbers=[];
  constructor(private service: PatientsService, fb: FormBuilder) {
    this.form = fb.group({
      id: ['', Validators.required],
      birthday: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/0-9]*$')]],
      height: ['', Validators.required],
      comments: [''],
    });
    for (var i = 140; i <= 200; i++) {
      this.numbers.push(i);
    }
   }

  ngOnInit(): void {
  }

  get id() {return this.form.get('id');}
  get birthday() {return this.form.get('birthday');}
  get firstName() {return this.form.get('firstName');}
  get lastName() {return this.form.get('lastName');}
  get email() {return this.form.get('email');}
  get address() {return this.form.get('address');}
  get phone() {return this.form.get('phone');}
  get height() {return this.form.get('height');}
  


  set id(value) {this.form.get('id').setValue(value);}
  set birthday(value) {this.form.get('birthday').setValue(value);}
  set firstName(value) {this.form.get('firstName').setValue(value);}
  set lastName(value) {this.form.get('lastName').setValue(value);}
  set email(value) {this.form.get('email').setValue(value);}
  set address(value) {this.form.get('address').setValue(value);}
  set phone(value) {this.form.get('phone').setValue(value);}
  set height(value) { this.form.get('height').setValue(value);}




  upper_first_letter() {
    if(this.form.get('firstName').value){
    this.form.controls['firstName'].setValue( this.firstName.value[0].toUpperCase() + this.firstName.value.substr(1).toLowerCase());
    }
    if(this.form.get('lastName').value){
      this.form.controls['lastName'].setValue( this.lastName.value[0].toUpperCase() + this.lastName.value.substr(1).toLowerCase());
      }
    }

  addNewPatient(){
    var patientDetails = this.form.value;
    this.service.create(patientDetails).subscribe(patient => {
      var type = 'success';
      var message = 'Patient: '+patient.firstName +' '+patient.lastName+ " added successfly"
      Utils.showNotification('how_to_reg', message, type);
    }, (error: AppError) => {
        var type = 'danger';
        var message = "Patient already exists"
        Utils.showNotification('error', message, type);
      
    });
  }
  
}
