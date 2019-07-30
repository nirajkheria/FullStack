import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {ManagerDashboardComponent} from './manager-dashboard/manager-dashboard.component';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async(() => {
    component = new AppComponent();
    TestBed.configureTestingModule({
      imports:[RouterModule],
      declarations: [
        AppComponent,ManagerDashboardComponent
      ],
    }).compileComponents();
  }));
  it('Should Create',()=>{
    expect(component).toBeTruthy();
  });
});
