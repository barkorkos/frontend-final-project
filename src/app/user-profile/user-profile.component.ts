import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TerapistService } from 'app/services/terapist.service';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  updateDetailsForm: FormGroup;
  changePasswordForm: FormGroup;
  terapist = {password: ''};
  constructor(fb: FormBuilder, private service: TerapistService) { 
    this.updateDetailsForm = fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-/0-9]*$')]],
    }); 
    this.changePasswordForm = fb.group({
      oldPassword: ['', [Validators.required,]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordValidators.passwordsShouldMatch,
    }); 

  }

  ngOnInit() {
    this.service.getOne({params: {id: '313536492'}}).subscribe(terapist => {
      this.terapist = terapist;
      console.log(terapist);
      this.updateDetailsForm.controls['id'].disable();
    });
  }
  
  
  get phone() {return this.updateDetailsForm.get('phone');}
  get email() {return this.updateDetailsForm.get('email');}

  get oldPassword() {return this.changePasswordForm.get('oldPassword');}
  get newPassword() {return this.changePasswordForm.get('newPassword');}
  get confirmPassword() {return this.changePasswordForm.get('confirmPassword');}


  
  changePassword() { 
    var terapistPassword = this.changePasswordForm.getRawValue();
    terapistPassword['id'] =  this.updateDetailsForm.get('id').value;
    console.log(terapistPassword);
    this.service.update(terapistPassword).subscribe(() => {
      var type = 'success';
      var message = "Password Updated Successfly";
      Utils.showNotification('how_to_reg', message, type);

    }, (error: AppError) => {
        var type = 'danger';
        var message = "Error Occure will Changing Password";
        Utils.showNotification('error', message, type);
      
    });  }
  
  updateDetails() {
    var terapistDetails = this.updateDetailsForm.getRawValue();
    console.log(terapistDetails);
    this.service.update(terapistDetails).subscribe(terapist => {
      var type = 'success';
      var message = "Profile Updated Successfly";
      Utils.showNotification('how_to_reg', message, type);
      this.terapist = terapist;
      this.terapist['last_name'] = terapist['lastName'];
      this.terapist['first_name'] = terapist['firstName'];
      this.terapist['user_id'] = terapist['id'];

    }, (error: AppError) => {
        var type = 'danger';
        var message = "Error Occure will Updating Details";
        Utils.showNotification('error', message, type);
      
    });
   }
}
