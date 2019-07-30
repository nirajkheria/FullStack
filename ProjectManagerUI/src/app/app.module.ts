import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DataFilterPipe } from './data-filter.pipe';
import { OrderModule } from 'ngx-order-pipe';


const routes: Routes = [
  { path: '', component: AddProjectComponent },
  { path: 'addProject', component: AddProjectComponent },
  
  { path: 'addTask', component: AddTaskComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'viewTask', component: ViewTaskComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    AddProjectComponent,
    ManagerDashboardComponent,
    AddUserComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,FormsModule,
    OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
