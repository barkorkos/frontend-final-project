import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {NewPatientComponent} from '../../new-patient/new-patient.component';

import { PatientAreaComponent } from 'app/patient-area/patient-area.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { StartTreatmentComponent } from '../../start-treatment/start-treatment.component';
import { LoginComponent } from 'app/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    NotificationsComponent,
    NewPatientComponent,
    PatientAreaComponent,
    StartTreatmentComponent,
  ]
})

export class AdminLayoutModule {}
