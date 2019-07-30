import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  // styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedTab = 'AddProject'
  toggleTab(val){
    this.selectedTab = val;
  }

}
