import { PatientAreaComponent } from './../../patient-area/patient-area.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
// import { TableListComponent } from '../../table-list/table-list.component';
// import { TypographyComponent } from '../../typography/typography.component';
// import { IconsComponent } from '../../icons/icons.component';
// import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
// import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {NewPatientComponent} from '../../new-patient/new-patient.component'

import { from } from 'rxjs';

import { StartTreatmentComponent } from './../../start-treatment/start-treatment.component';

import { Component } from '@angular/core';
import { LoginComponent } from 'app/login/login.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },

    //{ path: 'notifications',  component: NotificationsComponent },
    // {path: 'login', component: LoginComponent},
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'add-patient',   component: NewPatientComponent },
    { path: 'patient-area',   component: PatientAreaComponent },
    { path: 'start-treatment',   component: StartTreatmentComponent },
];
