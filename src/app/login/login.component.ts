import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppError } from 'common/app-error';
import { Utils } from 'app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean;
  form: FormGroup;

  constructor(private router: Router, private service: AuthService, fb: FormBuilder) { 
    this.form = fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn()
  {
    var credentials = this.form.value;
    this.service.login(credentials).subscribe(result=>{
      if(result)
      {
        console.log(result);
        console.log('&&&&&&&&');
        this.router.navigate(['/']);
      }
      else
      {
        this.invalidLogin = true;
        console.log('***');
      }
    }, (error: AppError) => {
      this.invalidLogin = true;
      /*console.log("46655NOTttt");
      var type = 'danger';
      var message = "Invalid User ID and/or Password."
      Utils.showNotification('error', message, type);*/
    
     });
  }

}