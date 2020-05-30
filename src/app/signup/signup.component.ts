import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TerapistService } from 'app/services/terapist.service';
import { PasswordValidators } from 'app/user-profile/password.validators';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;

  constructor(fb: FormBuilder, private service: TerapistService) { 
    this.signupForm = fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/0-9]*$')]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordValidators.passwordsShouldMatch
    }); 

  }
  upper_first_letter() {
    if(this.firstName.value)
      this.firstName.setValue( this.firstName.value[0].toUpperCase() + this.firstName.value.substr(1).toLowerCase());
    if(this.lastName.value)
      this.lastName.setValue( this.lastName.value[0].toUpperCase() + this.lastName.value.substr(1).toLowerCase());
    }
  ngOnInit(): void {
  }

  signup(){ 
    var newTerapistDetails = this.signupForm.value;
    this.service.create(newTerapistDetails).subscribe(patient => {
      var type = 'success';
      var message = 'Terapist: '+patient.firstName +' '+patient.lastName+ " added successfly! you can login now"
      Utils.showNotification('how_to_reg', message, type);
    }, (error: AppError) => {
        var type = 'danger';
        var message = "Terapist already exists"
        Utils.showNotification('error', message, type);
      
    });

  }

  get firstName() {return this.signupForm.get('firstName');}
  get lastName() {return this.signupForm.get('lastName');}
  get phone() {return this.signupForm.get('phone');}
  get email() {return this.signupForm.get('email');}

  get newPassword() {return this.signupForm.get('newPassword');}
  get confirmPassword() {return this.signupForm.get('confirmPassword');}
}
