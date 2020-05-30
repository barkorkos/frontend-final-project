import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgSelectOption } from '@angular/forms';
import { PatientsService } from 'app/services/patients.service';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';
//import { threadId } from 'worker_threads';

declare var $: any;
@Component({
  selector: 'app-patient-area',
  templateUrl: './patient-area.component.html',
  styleUrls: ['./patient-area.component.css']
})
export class PatientAreaComponent implements OnInit {
  
  form: FormGroup;
  searchForm: FormGroup;
  tableColumns  :  string[] = ['treatment_time', 'game_name', 'hand_in_therapy','treatment_duration','bubble_timeout'];
  dataSource = [];
  numbers=[];
  selectedHeight;


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

    this.searchForm = fb.group({
      searchInput: ['', Validators.required],
    });

    for (var i = 140; i <= 200; i++) {
      this.numbers.push(i);
    }
  }

  ngOnInit(): void {
    this.form.controls['id'].disable();
  }

  get id() {return this.form.get('id');}
  get birthday() {return this.form.get('birthday');}
  get firstName() {return this.form.get('firstName');}
  get lastName() {return this.form.get('lastName');}
  get email() {return this.form.get('email');}
  get address() {return this.form.get('address');}
  get phone() {return this.form.get('phone');}
  get height() {return this.form.get('height');}
  
  get searchInput() {return this.searchForm.get('searchInput');}

  upper_first_letter() {
    if(this.firstName.value)
      this.firstName.setValue( this.firstName.value[0].toUpperCase() + this.firstName.value.substr(1).toLowerCase());
    if(this.lastName.value)
      this.lastName.setValue( this.lastName.value[0].toUpperCase() + this.lastName.value.substr(1).toLowerCase());
    }

  onClickSearchPatient(){

        var idObject = {params:
                    {id: this.searchInput.value}
                };
        console.log(idObject);

          this.form.controls['id'].setValue(null);
          this.form.controls['firstName'].setValue(null);
          this.form.controls['lastName'].setValue(null);
          this.form.controls['email'].setValue(null);
          this.form.controls['address'].setValue(null);
          this.form.controls['phone'].setValue(null);
          this.form.controls['height'].setValue(null);
          //this.selectedHeight = patient.height;
          this.form.controls['comments'].setValue(null);
          this.form.controls['birthday'].setValue(null);

          this.dataSource = (null);

        this.service.getOne(idObject).subscribe(patient => {
          console.log(patient);
          this.form.controls['id'].setValue(patient.id);
          this.form.controls['firstName'].setValue(patient.first_name);
          this.form.controls['lastName'].setValue(patient.last_name);
          this.form.controls['email'].setValue(patient.email_address);
          this.form.controls['address'].setValue(patient.address);
          this.form.controls['phone'].setValue(patient.phone);
          this.form.controls['height'].setValue(patient.height);
          //this.selectedHeight = patient.height;
          this.form.controls['comments'].setValue(patient.details);
          this.form.controls['birthday'].setValue(patient.birthday.slice(0,10));

          
          console.log(this.form.controls.height);
          this.dataSource = (patient.history);
          console.log(this.dataSource);
          
        }, (error: AppError)=>{

          console.log("here");
          var type = 'danger';
          var message = "Patient Is Not Exists"
          Utils.showNotification('error', message, type);
        });
  }


  updatePatientDetails(){
    console.log("update patient ");
    var patientDetails = this.form.value;
    console.log(patientDetails);
    this.service.update(patientDetails).subscribe(patient => {
      var type = 'success';
      var message = 'Patient: '+patient.firstName +' '+patient.lastName+ " updated successfly"
      Utils.showNotification('how_to_reg', message, type);
    }, (error: AppError)=>{

      console.log("here");
      var type = 'danger';
      var message = "Problem Occurred While Trying To Update Details"
      Utils.showNotification('error', message, type);
    });


    console.log("Update patient finish");
  }
  
}
