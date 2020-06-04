import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgSelectOption } from '@angular/forms';
import { PatientsService } from 'app/services/patients.service';
import { Utils } from 'app/utils';
import { AppError } from 'common/app-error';

//import { threadId } from 'worker_threads';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

declare var $: any;

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};



@Component({
  selector: 'app-patient-area',
  templateUrl: './patient-area.component.html',
  styleUrls: ['./patient-area.component.css']
})
export class PatientAreaComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  form: FormGroup;
  searchForm: FormGroup;
  tableColumns  :  string[] = ['treatment_time', 'game_name', 'hand_in_therapy','treatment_duration','bubble_timeout'];
  dataSource = [];
  numbers=[];
  selectedHeight;


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

    this.chartOptions = {
      series: [
        {
          name: "poped bubbles",
          data: []
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            // reset: true | '<img src="/static/icons/reset.png" width="20">',
            // customIcons: []
          },
          autoSelected: 'zoom' 
        },
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: "Bubbles"
        }
      },


    };


  }

  ngOnInit(): void {
    this.form.controls['id'].disable();
  }

  get id() {return this.form.get('id');}
  get birthday() {return this.form.get('birthday');}
  get firstName() {return this.form.get('firstName');}
  get lastName() {return this.form.get('lastName');}
  get email() {return this.form.get('email');}
  get address() {return this.form.get('address');}
  get phone() {return this.form.get('phone');}
  get height() {return this.form.get('height');}
  
  get searchInput() {return this.searchForm.get('searchInput');}

  upper_first_letter() {
    if(this.firstName.value)
      this.firstName.setValue( this.firstName.value[0].toUpperCase() + this.firstName.value.substr(1).toLowerCase());
    if(this.lastName.value)
      this.lastName.setValue( this.lastName.value[0].toUpperCase() + this.lastName.value.substr(1).toLowerCase());
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
          //this.selectedHeight = patient.height;
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
          //this.selectedHeight = patient.height;
          this.form.controls['comments'].setValue(patient.details);
          this.form.controls['birthday'].setValue(patient.birthday.slice(0,10));

          
          console.log(this.form.controls.height);
          this.dataSource = (patient.history);
          console.log(this.dataSource);
          this.createChart(patient.history);
          
        }, (error: AppError)=>{

          console.log("here");
          var type = 'danger';
          var message = "Patient Is Not Exists"
          Utils.showNotification('error', message, type);
        });
  }
  
  createChart(patientHistory){
    var poped_bubbles = this.jsonTo3Dtable(patientHistory[0].total_bubbles_table);
    var chartCategories = [];
    var poped_value = []
    for (var key in poped_bubbles){
      poped_value.push(poped_bubbles[key]);
      chartCategories.push("("+key.split("^").join(",")+")");
    }
    this.chartOptions = {
      series: [
        {
          name: "poped bubbles",
          data: poped_value
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          zoomedArea:{
            fill:{
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 10,
            }
            
          }
          
        } 
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "90%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: chartCategories
      },
      yaxis: {
        title: {
          text: "Bubbles Number"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return  val + " Bubbles";
          }
        }
      },
      // responsive: true,
      // maintainAspectRatio: true

    };
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
  
}
