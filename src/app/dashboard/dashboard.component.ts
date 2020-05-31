import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) { }
  
  ngOnInit() {
    if(!this.service.isLoggedIn())
    {
      this.router.navigate(['/']);
    }
   }

}
