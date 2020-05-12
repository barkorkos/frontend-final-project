import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit {

  constructor(private message, private icon, private type) { 
  }


  ngOnInit(): void {
  }

}
