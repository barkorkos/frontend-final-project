import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from 'app/services/patients.service';



declare var $: any;
@Component({
  selector: 'app-patient-area',
  templateUrl: './patient-area.component.html',
  styleUrls: ['./patient-area.component.css']
})
export class PatientAreaComponent implements OnInit {
  
  form: FormGroup;
  tableColumns  :  string[] = ['treatment_time', 'game_name', 'hand_in_therapy','treatment_duration','bubble_timeout'];
  dataSource = [];

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
  }

  ngOnInit(): void {
  }

  onClickSearchPatient(patientID){
    var idObject = {params:
                {id: patientID}
            };
    console.log(idObject);
    this.service.getOne(idObject).subscribe(patient => {
      console.log(patient);
      this.form.controls['id'].setValue(patient.id);
      this.form.controls['firstName'].setValue(patient.first_name);
      this.form.controls['lastName'].setValue(patient.last_name);
      this.form.controls['email'].setValue(patient.email_address);
      this.form.controls['address'].setValue(patient.address);
      this.form.controls['phone'].setValue(patient.phone);
      this.form.controls['height'].setValue(patient.height);
      this.form.controls['comments'].setValue(patient.details);
      this.form.controls['birthday'].setValue(patient.birthday.slice(0,10));

      console.log(patient.history[0]);
      this.dataSource = (patient.history);
      console.log(this.dataSource);
      
    })
  }


  updatePatientDetails(){
    console.log("update patient ");
    var patientDetails = this.form.value;
    console.log(patientDetails);
    this.service.update(patientDetails).subscribe(patient => {
    
      //var message = 'Patient: '+patient.firstName +' '+patient.lastName+ " added successfly"
      //console.log(message);
      //new AlertPopupComponent(message, 'how_to_reg', type);
      //this.showNotification('top','center', type, message, 'how_to_reg')
    });
    console.log("Update patient finish");

  }

}
