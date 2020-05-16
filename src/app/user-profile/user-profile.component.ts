import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TerapistService } from 'app/services/terapist.service';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  updateDetailsForm: FormGroup;
  changePasswordForm: FormGroup;
  terapist = {};
  constructor(fb: FormBuilder, private service: TerapistService) { 
    this.updateDetailsForm = fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    }); 
    this.changePasswordForm = fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }); 


  }

  ngOnInit() {
    this.service.getOne({params: {id: '313536492'}}).subscribe(terapist => {
      this.terapist = terapist;
      this.updateDetailsForm.controls['id'].disable();
    });
  }
  changePassword() { }
  
  updateDetails() {
    var terapistDetails = this.updateDetailsForm.getRawValue();
    console.log(terapistDetails);
    this.service.update(terapistDetails).subscribe(terapist => {
      var type = 'success';
      var message = "Profile Updated Successfly"
      Utils.showNotification('how_to_reg', message, type);
      this.terapist = terapist;
      this.terapist['last_name'] = terapist['lastName'];
      this.terapist['first_name'] = terapist['firstName'];
      this.terapist['user_id'] = terapist['id'];

    }, (error: AppError) => {
        var type = 'danger';
        var message = "Error Occure will Updating Details"
        Utils.showNotification('error', message, type);
      
    });
   }
}
