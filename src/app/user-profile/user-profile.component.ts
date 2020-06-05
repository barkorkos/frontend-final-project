import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TerapistService } from 'app/services/terapist.service';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';
import { PasswordValidators } from './password.validators';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  updateDetailsForm: FormGroup;
  changePasswordForm: FormGroup;
  terapist = {password: ''};
  constructor(fb: FormBuilder, private service: TerapistService, private authService: AuthService) { 

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
    
    

    // this.updateDetailsForm.controls['id'].disable();

  }

  ngOnInit() {
    console.log("on init!");
    if(this.authService.isLoggedIn())
    {
      var id = this.authService.currentUser.iss;
      console.log("The id of the current user is:"+id);
      this.service.getOne({params: {id: id}}).subscribe(terapist => {
        this.terapist = terapist;
        this.updateDetailsForm.controls['lastName'].setValue(this.terapist['last_name']);
        this.updateDetailsForm.controls['firstName'].setValue(this.terapist['first_name']);
        this.updateDetailsForm.controls['id'].setValue(this.terapist['user_id']);
        this.updateDetailsForm.controls['email'].setValue(this.terapist['email']);
        this.updateDetailsForm.controls['phone'].setValue(this.terapist['phone']);
        this.updateDetailsForm.controls['address'].setValue(this.terapist['address']);
        this.updateDetailsForm.controls['id'].disable();
      });
    }
  }
  
  
  get phone() {return this.updateDetailsForm.get('phone');}
  get email() {return this.updateDetailsForm.get('email');}

  get oldPassword() {return this.changePasswordForm.get('oldPassword');}
  get newPassword() {return this.changePasswordForm.get('newPassword');}
  get confirmPassword() {return this.changePasswordForm.get('confirmPassword');}

  set phone(value) { this.updateDetailsForm.get('phone').setValue(value);}
  set email(value) { this.updateDetailsForm.get('email').setValue(value);}

  set oldPassword(value) { this.changePasswordForm.get('oldPassword').setValue(value);}
  set newPassword(value) { this.changePasswordForm.get('newPassword').setValue(value);}
  set confirmPassword(value) { this.changePasswordForm.get('confirmPassword').setValue(value);}


  
  changePassword() { 
    var terapistPassword = this.changePasswordForm.getRawValue();
    terapistPassword['id'] =  this.updateDetailsForm.get('id').value;
    console.log(terapistPassword);
    this.service.update(terapistPassword).subscribe(() => {
      var type = 'success';
      var message = "Password Updated Successfly";
      Utils.showNotification('how_to_reg', message, type);
      this.terapist.password = this.changePasswordForm.controls['newPassword'].value;

      this.changePasswordForm.controls['oldPassword'].setValue(null);
      this.changePasswordForm.controls['newPassword'].setValue(null);
      this.changePasswordForm.controls['confirmPassword'].setValue(null);

     // this.changePasswordForm.clearValidators();
      this.changePasswordForm.reset();
      Object.keys(this.changePasswordForm.controls).forEach(key => {
        this.changePasswordForm.controls[key].setErrors(null)
      });

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

      this.updateDetailsForm.controls['last_name'].setValue(terapist['lastName']);
      this.updateDetailsForm.controls['first_name'].setValue(terapist['firstName']);
      this.updateDetailsForm.controls['user_id'].setValue(terapist['id']);
      this.updateDetailsForm.controls['email'].setValue(terapist['email']);
      this.updateDetailsForm.controls['phone'].setValue(terapist['phone']);
      this.updateDetailsForm.controls['address'].setValue(terapist['address']);

      // this.terapist = terapist;
      // this.terapist['last_name'] = terapist['lastName'];
      // this.terapist['first_name'] = terapist['firstName'];
      // this.terapist['user_id'] = terapist['id'];

    }, (error: AppError) => {
        var type = 'danger';
        var message = "Error Occure will Updating Details";
        Utils.showNotification('error', message, type);
      
    });
   }
}
