import { Component, OnInit , AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-cube3d',
  templateUrl: './cube3d.component.html',
  styleUrls: ['./cube3d.component.css']
})
export class Cube3dComponent implements OnInit {

  cube;
  radioGroup;
  currentClass

  constructor() { 

  }

  ngOnInit(): void {
    this.cube = document.getElementsByClassName('cube')[0];
    console.log(this.cube);
    this.radioGroup = document.getElementsByClassName('radio-group')[0];
    console.log(this.radioGroup);
    this.currentClass = '';
  }
  
  // AfterViewInit() {
  //   // this.radioGroup.addEventListener( 'change', this.changeSide );
  // }

  changeSide(e) {
    console.log(e)
    var checkedRadio = this.radioGroup.querySelector(':checked');
    var showClass = 'show-' + checkedRadio.value;
    if ( this.currentClass ) {
      this.cube.classList.remove( this.currentClass );
    }
    this.cube.classList.add( showClass );
    this.currentClass = showClass;
  }
}


// function changeSide() {
//   var checkedRadio = radioGroup.querySelector(':checked');
//   var showClass = 'show-' + checkedRadio.value;
//   if ( currentClass ) {
//     cube.classList.remove( currentClass );
//   }
//   cube.classList.add( showClass );
//   currentClass = showClass;
// }
// // set initial side
// changeSide();

// radioGroup.addEventListener( 'change', changeSide );