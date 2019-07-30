import { TestBed, inject } from '@angular/core/testing';

import { ProjectManagerServiceService, ITask, IProject, IParentTask, IUser } from './project-manager-service.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

const TASKLIST :ITask[] =[
  {"Task_ID":1,"Task":"Task-1","Parent_ID":7, "Project_ID":1,
  "StartDate":"2019-03-11T00:00:00","EndDate":"2019-03-25T00:00:00",
  "Priority":11,"Status":"In Progress", "ParentTaskName" : "Parent1",
    "User" : {
      "User_ID" : 1,
      "Employee_ID" : 123456,
      "FirstName" : "Niraj",
      "LastName" : "Kheria",
      "Project_ID" : 1,
      "Task_ID" : 1
    },
    "Project" : {
      "Project_ID" : 1,
      "Project" : "Project1",
      "StartDate":"2019-03-11T00:00:00","EndDate":"2019-03-25T00:00:00",
      "Priority":11,
      "Manager" : {
        "User_ID" : 1,
        "Employee_ID" : 123456,
        "FirstName" : "Niraj",
        "LastName" : "Kheria",
        "Project_ID" : 1,
        "Task_ID" : 1
      },
      "NoofTasks" :0,
      "Completed":0
    },
    "ParentTask" : {
        "Parent_ID" : 1,
        "Parent_Task" : "Parent1"
    }
    }
  ];

  const PROJECTLIST :IProject[] =[
    {
      
        "Project_ID" : 1,
        "Project" : "Project1",
        "StartDate":"2019-03-11T00:00:00","EndDate":"2019-03-25T00:00:00",
        "Priority":11,
        "Manager" : {
          "User_ID" : 1,
          "Employee_ID" : 123456,
          "FirstName" : "Niraj",
          "LastName" : "Kheria",
          "Project_ID" : 1,
          "Task_ID" : 1
        },
        "NoofTasks" :0,
        "Completed":0
      }
    ];

    const PARENTLIST :IParentTask[] =[
      {
        "Parent_ID" : 1,
        "Parent_Task" : "Parent1"
    }
      ];

      const USERLIST :IUser[] =[
        {
          "User_ID" : 1,
          "Employee_ID" : 123456,
          "FirstName" : "Niraj",
          "LastName" : "Kheria",
          "Project_ID" : 1,
          "Task_ID" : 1
        }
        ];


const fakeProject=
{
      
  "Project_ID" : 1,
  "Project" : "Project1",
  "StartDate":"2019-03-11T00:00:00","EndDate":"2019-03-25T00:00:00",
  "Priority":11,
  "Manager" : {
    "User_ID" : 1,
    "Employee_ID" : 123456,
    "FirstName" : "Niraj",
    "LastName" : "Kheria",
    "Project_ID" : 1,
    "Task_ID" : 1
  },
  "NoofTasks" :0,
  "Completed":0
};

 const fakeParent =
 {
  "Parent_ID" : 1,
  "Parent_Task" : "Parent1"
};

        const fakeUser =
        {
          "User_ID" : 1,
          "Employee_ID" : 123456,
          "FirstName" : "Niraj",
          "LastName" : "Kheria",
          "Project_ID" : 1,
          "Task_ID" : 1
        };


const fakeTask = {"Task_ID":1,"Task":"Task-1","Parent_ID":7, "Project_ID":1,
"StartDate":"2019-03-11T00:00:00","EndDate":"2019-03-25T00:00:00",
"Priority":11,"Status":"In Progress", "ParentTaskName" : "Parent1",
  "User" : {
    "User_ID" : 1,
    "Employee_ID" : 123456,
    "FirstName" : "Niraj",
    "LastName" : "Kheria",
    "Project_ID" : 1,
    "Task_ID" : 1
  },
  "Project" : {
    "Project_ID" : 1,
    "Project" : "Project1",
    "StartDate":"2019-03-11T00:00:00","EndDate":"2019-03-25T00:00:00",
    "Priority":11,
    "Manager" : {
      "User_ID" : 1,
      "Employee_ID" : 123456,
      "FirstName" : "Niraj",
      "LastName" : "Kheria",
      "Project_ID" : 1,
      "Task_ID" : 1
    },
    "NoofTasks" :0,
    "Completed":0
  },
  "ParentTask" : {
      "Parent_ID" : 1,
      "Parent_Task" : "Parent1"
  }
  };

describe('ProjectManagerServiceService', () => {

  let pmService: ProjectManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ProjectManagerServiceService]
    });

    pmService = TestBed.get(ProjectManagerServiceService)
  });

  it('should be created', () => {
    expect(pmService).toBeTruthy();
  });

  it('PM Sevice Get Task List',()=>{


    let response;
      spyOn(pmService, 'getTaskList').and.returnValue(of(TASKLIST));

      pmService.getTaskList().subscribe(res => {
        response = res;
      });

      expect(response[0].User.FirstName).toEqual('Niraj');
  });

  it('PM Sevice Add Task List',()=>{


    let response;
      spyOn(pmService, 'addTask').and.returnValue(of(TASKLIST));

      pmService.addTask(fakeTask).subscribe(res => {
        response = res;
      });

      expect(response[0].User.FirstName).toEqual('Niraj');
  });

  it('PM Sevice Update Task List',()=>{


    let response;
      spyOn(pmService, 'updateTask').and.returnValue(of(TASKLIST));

      pmService.updateTask(fakeTask).subscribe(res => {
        response = res;
      });

      expect(response[0].User.FirstName).toEqual('Niraj');
  });

  it('PM Sevice Get Projects',()=>{


    let response;
      spyOn(pmService, 'getProjects').and.returnValue(of(PROJECTLIST));

      pmService.getProjects().subscribe(res => {
        response = res;
      });

      expect(response[0].Manager.FirstName).toEqual('Niraj');
  });

  it('PM Sevice Add Project',()=>{


    let response;
      spyOn(pmService, 'addProject').and.returnValue(of(PROJECTLIST));

      pmService.addProject(fakeProject).subscribe(res => {
        response = res;
      });

      expect(response[0].Manager.FirstName).toEqual('Niraj');
  });

  it('PM Sevice Update Project',()=>{


    let response;
      spyOn(pmService, 'updateProject').and.returnValue(of(PROJECTLIST));

      pmService.updateProject(fakeProject).subscribe(res => {
        response = res;
      });

      expect(response[0].Manager.FirstName).toEqual('Niraj');
  });

  it('PM Sevice Get Users',()=>{


    let response;
      spyOn(pmService, 'getUsers').and.returnValue(of(USERLIST));

      pmService.getUsers().subscribe(res => {
        response = res;
      });

      expect(response[0].FirstName).toEqual('Niraj');
  });

  it('PM Sevice Add User',()=>{


    let response;
      spyOn(pmService, 'addUser').and.returnValue(of(USERLIST));

      pmService.addUser(fakeUser).subscribe(res => {
        response = res;
      });

      expect(response[0].FirstName).toEqual('Niraj');
  });

  it('PM Sevice Update User',()=>{


    let response;
      spyOn(pmService, 'updateUser').and.returnValue(of(USERLIST));

      pmService.updateUser(fakeUser).subscribe(res => {
        response = res;
      });

      expect(response[0].FirstName).toEqual('Niraj');
  });

  it('PM Sevice Get Parent Tasks',()=>{


    let response;
      spyOn(pmService, 'getParentTasks').and.returnValue(of(PARENTLIST));

      pmService.getParentTasks().subscribe(res => {
        response = res;
      });

      expect(response[0].Parent_Task).toEqual('Parent1');
  });

  it('PM Sevice Add Parent Task',()=>{


    let response;
      spyOn(pmService, 'addParentTask').and.returnValue(of(PARENTLIST));

      pmService.addParentTask(fakeParent).subscribe(res => {
        response = res;
      });

      expect(response[0].Parent_Task).toEqual('Parent1');
  });

});
