import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from 'app/services/patients.service';
import { Utils } from 'app/utils';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  form: FormGroup;
  constructor(private service: PatientsService, fb: FormBuilder) {
    this.form = fb.group({
      id: ['', Validators.required],
      birthday: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      height: ['', Validators.required],
      comments: [''],
    });
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
  
  addNewPatient(){
    console.log("add patient ");
    var patientDetails = this.form.value;
    console.log(patientDetails);
    this.service.create(patientDetails).subscribe(patient => {
      var type = 'success';
      var message = 'Patient: '+patient.firstName +' '+patient.lastName+ " added successfly"
      //new AlertPopupComponent(message, 'how_to_reg', type);
      //this.showNotification('top','center', type, message, 'how_to_reg')
      Utils.showNotification('how_to_reg', message, type);
    });
    console.log("add patient after");

  }

}
