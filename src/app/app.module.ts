import { TreatmentService } from 'app/services/treatment.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { NotificationsComponent } from './notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';import { AgmCoreModule } from '@agm/core';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DataService } from './services/data.service';
import { PatientsService } from './services/patients.service';
import { AppErrorHandler } from 'common/app-error-handler';
import { TerapistService } from './services/terapist.service';

import { StartTreatmentComponent } from './start-treatment/start-treatment.component';

import { LoginComponent } from './login/login.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatInputModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
  ],
  providers: [
    DataService,
    PatientsService,
    TerapistService,
    TreatmentService,
    { provide: ErrorHandler, useClass: AppErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
