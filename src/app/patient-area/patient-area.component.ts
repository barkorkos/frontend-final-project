import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgSelectOption } from '@angular/forms';
import { PatientsService } from 'app/services/patients.service';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';



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
  chartDates = [];
  selectedHeight;
  patientDetails;

  barChartOptions: ChartOptions = {
    responsive: true,
    
    scales:{
      xAxes: [{
        ticks:{
          padding:5,
          stepSize: 1
        },
        scaleLabel: {
          display: true,
          labelString: "Point in Space",
          fontFamily: "Arial Black",
          fontSize: 16,
          
        }
      }],
      yAxes: [{
        ticks:{
          stepSize: 1,
          
        },
        scaleLabel: {
          display: true,
          labelString: "Number of Bubbles",
          fontFamily: "Arial Black",
          fontSize: 18,
        },
        
      }],
      
    
      
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { barThickness: 15, data: [], label: 'Total Bubles',  backgroundColor: 'rgba(0, 112, 192, 0.7)' , hoverBackgroundColor:'rgba(0, 112, 192, 0.8)'},
    { barThickness: 15, data: [], label: 'Poped Bubles', backgroundColor: 'rgba(214, 144, 236, 0.7)', hoverBackgroundColor:'rgba(214, 144, 236, 0.8)' }
  ];
  

  public doughnutChartColor = [
    {
      backgroundColor: [
        'rgba(112, 48, 160, 1)',
        'rgba(112, 173, 71, 1)',
        'rgba(255, 192, 0, 1)',
        'rgba(0, 112, 192, 1)',
        'rgba(104, 218, 242,1)',
        'rgba(192, 0, 0, 1)',
        'rgba(255, 39, 190, 1)',
        'rgba(255, 255, 0, 1)',
        'rgba(143, 143, 143, 1)',
        'rgba(214, 144, 236, 1)',
        'rgba(88, 255, 5, 1)',
        'rgba(112, 48, 160, 1)',
      ] 
    },
    {
      backgroundColor: [
        'rgba(112, 48, 160, 0.4)',
        'rgba(112, 173, 71, 0.4)',
        'rgba(255, 192, 0, 0.4)',
        'rgba(0, 112, 192, 0.4)',
        'rgba(104, 218, 242, 0.4)',
        'rgba(192, 0, 0, 0.4)',
        'rgba(255, 39, 190, 0.4)',
        'rgba(255, 255, 0, 0.4)',
        'rgba(143, 143, 143, 0.4)',
        'rgba(214, 144, 236, 0.4)',
        'rgba(88, 255, 5, 0.4)',
        'rgba(112, 48, 160, 0.4)',
      ] 
    }
  ];

   avgbarChartOptions: ChartOptions = {
    responsive: true,
    
    scales:{
      xAxes: [{
        ticks:{
          padding:5,
          stepSize: 1
        },
        scaleLabel: {
          display: true,
          labelString: "Regions in Space(See 3D Rectangle)",
          fontFamily: "Arial Black",
          fontSize: 16,
          
        }
      }],
      yAxes: [{
        ticks:{
          stepSize: 10,
          
        },
        scaleLabel: {
          display: true,
          labelString: "Number of Bubbles",
          fontFamily: "Arial Black",
          fontSize: 18,
        },
        
      }],
      
    
      
    }
  };
  avgbarChartLabels: Label[] = ['front-top-left',
                                'back-top-left',
                                'front-top-center',
                                'back-top-center',
                                'front-top-right',
                                'back-top-right',
                                'front-bottom-left',
                                'back-bottom-left',
                                'front-bottom-center',
                                'back-bottom-center',
                                'front-bottom-right',
                                'back-bottom-right'];
                        
  avgbarChartType: ChartType = 'bar';
  avgbarChartLegend = true;
  avgbarChartPlugins = [];
  avgbarChartData: ChartDataSets[] = [
    { barThickness: 15, data: [], label: 'Total Bubles' },
    { barThickness: 15, data: [], label: 'Poped Bubles' }
  ];







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

  ngOnInit(): void { this.form.controls['id'].disable();}

  get id() {return this.form.get('id');}
  get birthday() {return this.form.get('birthday');}
  get firstName() {return this.form.get('firstName');}
  get lastName() {return this.form.get('lastName');}
  get email() {return this.form.get('email');}
  get address() {return this.form.get('address');}
  get phone() {return this.form.get('phone');}
  get height() {return this.form.get('height');}
  
  get searchInput() {return this.searchForm.get('searchInput');}



  set id(value) {this.form.get('id').setValue(value);}
  set birthday(value) { this.form.get('birthday').setValue(value);}
  set firstName(value) { this.form.get('firstName').setValue(value);}
  set lastName(value) { this.form.get('lastName').setValue(value);}
  set email(value) { this.form.get('email').setValue(value);}
  set address(value) { this.form.get('address').setValue(value);}
  set phone(value) { this.form.get('phone').setValue(value);}
  set height(value) { this.form.get('height').setValue(value);}
  
  set searchInput(value) { this.searchForm.get('searchInput').setValue(value);}


  upper_first_letter() {
    if(this.form.get('firstName').value){
    this.form.controls['firstName'].setValue( this.firstName.value[0].toUpperCase() + this.firstName.value.substr(1).toLowerCase());
    }
    if(this.form.get('lastName').value){
      this.form.controls['lastName'].setValue( this.lastName.value[0].toUpperCase() + this.lastName.value.substr(1).toLowerCase());
      }
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
          this.form.controls['comments'].setValue(patient.details);
          this.form.controls['birthday'].setValue(patient.birthday.slice(0,10));

          
          console.log(this.form.controls.height);
          this.dataSource = (patient.history);
          console.log(this.dataSource);
          for(var i=0; i< patient.history.length; i++){
            this.chartDates.push(patient.history[i].treatment_time.slice(0,16).replace("T"," "));
          }

          this.createChart(patient.history[patient.history.length-1]);
          this.createAvgChart(patient.history[patient.history.length-1]);
          this.patientDetails = patient.history;

          
        }, (error: AppError)=>{

          console.log("here");
          var type = 'danger';
          var message = "Patient Is Not Exists"
          Utils.showNotification('error', message, type);
        });
  }
  
  createChart(patientHistory){
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    this.barChartLabels = [];
    if(patientHistory){

    var total_bubbles = this.jsonTo3Dtable(patientHistory.total_bubbles_table);
    var poped_bubbles = this.jsonTo3Dtable(patientHistory.poped_bubbles_table);

    for (var key in poped_bubbles){
      this.barChartData[0].data.push(total_bubbles[key]);
      this.barChartData[1].data.push(poped_bubbles[key]);
      this.barChartLabels.push("("+key.split("^").join(",")+")");
    }
  }

    
  }


    createAvgChart(patientHistory){
      
      this.avgbarChartData[0].data = [];
      this.avgbarChartData[1].data = [];
      if(patientHistory){
       
      var total_bubbles = this.createGraphData(patientHistory.total_bubbles_table);
      console.log(total_bubbles)
      var poped_bubbles = this.createGraphData(patientHistory.poped_bubbles_table);

      for(var key in total_bubbles){
        this.avgbarChartData[0].data.push(total_bubbles[key]);
        this.avgbarChartData[1].data.push(poped_bubbles[key]);
      }
    }
    }




  selectDate(sorce){
    this.createChart(this.patientDetails[sorce.value]);
    this.createAvgChart(this.patientDetails[sorce.value]);
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

  jsonTo3Dtable(table){
    var n = parseInt(table.split(',').pop().split(':')[0].split('^').pop())+1
    var dictionary = this.jsonToDictionary(table);
    return dictionary;
  }
  
  jsonToDictionary(table){
    var items = table.split(',');
    var dictionary= {};
    for (var i=0 ; i<items.length ; i++)
    {
      var keyValue = items[i].split(':');
      dictionary[keyValue[0]]=parseInt(keyValue[1]);
    }
    return dictionary;
  }
  
  createGraphData(table){
    var n = parseInt(table.split(',').pop().split(':')[0].split('^').pop());
    var data = this.jsonTo3Dtable(table);
    var areas = {
      'front-up-left':0,
      'back-up-left':0,
      'front-up-center':0,
      'back-up-center':0,
      'front-up-right':0,
      'back-up-right':0,
      'front-down-left':0,
      'back-down-left':0,
      'front-down-center':0,
      'back-down-center':0,
      'front-down-right':0,
      'back-down-right':0,
    }
    for(var key in data){
      var area = '';
      var point = key.split('^');
      if(parseInt(point[2]) <= (n/2))
        area += 'front-';
      else
        area += 'back-';
      
      if(parseInt(point[1]) <= n)
        area += 'down-';
      else
        area += 'up-';

      if(parseInt(point[0]) <= 2*n/3)
        area += 'left';
      else if(parseInt(point[0]) <= (4*n/3))
        area += 'center' ;
      else
        area += 'right';

      areas[area] += data[key];
    }

    return areas;
  }
  
}
