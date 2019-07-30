import { Component, OnInit,Input } from '@angular/core';
import { FormsModule} from '@angular/forms';
import * as moment from 'moment';
import { IProject, IUser, ProjectManagerServiceService, IParentTask, ITask } from '../project-manager-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[ProjectManagerServiceService]
})
export class AddTaskComponent implements OnInit {

  constructor(
    private _pmService: ProjectManagerServiceService,
    private modalService: NgbModal) { }

  project: string = '';
  selectedProject: IProject = null;
  selectedUser: IUser = null;
  selectedParent: IParentTask = null;
  selectedName: string = '';
  parentTask: string = '';

  selectedTask: ITask = null;

  public projectList : IProject[];
  public userList : IUser[];
  public parentList : IParentTask[];

  searchProjectText: string ='';
  searchUserText: string = '';
  searchParentText: string = '';

  isChecked: boolean = false;

  taskID : number=0;
  task:string = "";
  parentTaskID:number= null;
  priority:number = 0;
  startDate:string;
  endDate:string;
  Task:ITask ={} as any;
  formTitle ="Add";
  errorMessage:string = "";
  successMessage:string ="";
  isError:boolean = false;
  isSuccess:boolean = false;


  projectID:number = null;
  userID: number = null;
  fromViewTask: boolean = false;
  
  @Input() EditTask: ITask;

  ngOnInit() {
    this.getProjects();

    this.getUsers();

    this.getParentTasks();

    if (this.EditTask) {
      this.fromViewTask = true;
      this.formTitle ="Update";
      this.selectedTask = this.EditTask;
      this.taskID =this.selectedTask.Task_ID;
      this.task = this.selectedTask.Task;

      this.parentTaskID =  this.selectedTask.Parent_ID;
      this.projectID =  this.selectedTask.Project_ID
      if(this.selectedTask.User)
      {
      this.userID = this.selectedTask.User.User_ID;
      }

      

      this.priority = this.selectedTask.Priority;
      this.startDate =  moment(this.selectedTask.StartDate).format("YYYY-MM-DD");
      this.endDate = moment(this.selectedTask.EndDate).format("YYYY-MM-DD");
    } 
  }

  private getProjects()
  {
    this._pmService.getProjects<IProject[]>().subscribe((data :IProject[])=> 
    
    {
      this.projectList = data;
      if(this.projectID)
      {
      this.selectedProject = this.projectList.find(x=>x.Project_ID == this.projectID);
      this.project = this.selectedProject.Project;
      }
    }),
    finalize(()=>{
    });
  }

  private getUsers()
  {
    this._pmService.getUsers<IUser[]>().subscribe((data :IUser[])=> 
      {
        this.userList = data;
        if(this.userID)
            {
            this.selectedUser = this.userList.find(x=>x.User_ID == this.userID);
            this.selectedName = this.selectedUser.FirstName + ' ' + this.selectedUser.LastName;

            }
      }
    ),
    finalize(()=>{
    });
  }

  private getParentTasks()
  {
    this._pmService.getParentTasks<IParentTask[]>()
    .subscribe((data :IParentTask[])=>
    {
    this.parentList = data;
    if(this.parentTaskID)
      {
          this.selectedParent = this.parentList.find(x=>x.Parent_ID == this.parentTaskID);
        this.parentTask = this.selectedParent.Parent_Task;
      }


    }),
    finalize(()=>{
    });
  }

  addTask(){
   
      if(this.isChecked)
      {

        if (this.task=="") {
          this.isError=true;
          this.errorMessage = errorMessage.task;
          setTimeout(()=>{ 
            this.isError =false;
            this.errorMessage ="";
           }, 3000);
           return;
        } 

        let parent = <IParentTask>{};
        
        parent.Parent_Task = this.task;
        
        let result =this._pmService.addParentTask(parent).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.getParentTasks();
  
            }
          },
          error => {
          });

          if ( result)
            {
            this.isSuccess =true;
            this.successMessage =successMessage.saved;
            setTimeout(()=>{ 
              this.isSuccess =false;
              this.successMessage ="";
              this.resetForm();
            }, 3000);

            }
      }

      else
      {

        this.validateData();
        if (this.isError) {
            return;
          } 
    
        let task = <ITask>{};

        if(this.selectedParent)
        {
          task.Parent_ID = this.selectedParent.Parent_ID;
        }
        
        task.Project_ID = this.selectedProject.Project_ID;
        task.Task  = this.task;
        task.StartDate = this.startDate;
        task.EndDate = this.endDate;
        task.Priority = this.priority;
        if(this.selectedUser)
        {
        task.User = {} as any;
        task.User.User_ID = this.selectedUser.User_ID;
        task.User.Employee_ID = this.selectedUser.Employee_ID;
        task.User.FirstName = this.selectedUser.FirstName;
        task.User.LastName = this.selectedUser.LastName;
        task.User.Project_ID = this.selectedUser.Project_ID;
        task.User.Task_ID = this.selectedUser.Task_ID;
        }
        if(this.formTitle == 'Add')
        {
        let result =this._pmService.addTask(task).pipe(first())
        .subscribe(
          data => {
            if (data) {
              //this.getProjects();
  
            }
          },
          error => {
          });
            if ( result)
            {
            this.isSuccess =true;
            this.successMessage =successMessage.saved;
            setTimeout(()=>{ 
              this.isSuccess =false;
              this.successMessage ="";
              this.resetForm();
            }, 3000);

            }
        }
        else
        {
          task.Task_ID = this.selectedTask.Task_ID;
        let result =this._pmService.updateTask(task).pipe(first())
        .subscribe(
          data => {
            if (data) {
              //this.getProjects();
  
            }
          },
          error => {
          });
            if ( result)
            {
            this.isSuccess =true;
            this.successMessage =successMessage.updated;
            setTimeout(()=>{ 
              this.isSuccess =false;
              this.successMessage ="";
              this.resetForm();
            }, 3000);
            }
        }
      }

      this.formTitle = 'Add';
  
  }

  enableDisableControls()
  {
    this.isChecked = !this.isChecked;
    if(this.isChecked)
    {
      this.project = '';
      this.priority = 0;
      this.parentTask ='';
      this.startDate = '';
      this.endDate = '';
      this.selectedName ='';
    }
  }

  private validateData(){
    if (this.selectedProject == null) {
      this.isError=true;
      this.errorMessage = errorMessage.project;
    } 
    else if (this.task=="") {
      this.isError=true;
      this.errorMessage = errorMessage.task;
    } 
    else if (this.priority==0 || this.priority==null) {
      this.isError=true;
      this.errorMessage = errorMessage.priority;
    } 
    else if (this.startDate == null) {
      this.isError=true;
      this.errorMessage = errorMessage.startDate;
    } 
    else if (this.endDate==null) {
      this.isError=true;
      this.errorMessage = errorMessage.endDate;
    } 
    else if(this.startDate>this.endDate){
      this.isError=true;
      this.errorMessage = errorMessage.dateCompare;
    }
    else if (this.selectedUser == null) {
      this.isError=true;
      this.errorMessage = errorMessage.user;
    } 
    else{
      this.errorMessage ="";
      this.isError =false;
    }
    setTimeout(()=>{ 
      this.isError =false;
      this.errorMessage ="";
     }, 3000);
  }
  
  resetForm()
  {
    this.project = '';
    this.selectedProject = null;
    this.task = "";
    this.isChecked = false;
    this.priority = 0;
    this.parentTask = '';
    this.selectedParent = null;
    this.startDate =null;
    this.endDate =null;
    this.selectedName = '';
    this.selectedUser = null;
    this.isError =false;
    this.errorMessage ="";
    this.formTitle = 'Add';
  }

  open(content)
  {
    this.modalService.open(content, { centered: true ,size: 'lg' });
  }

  selectUser(userid)
  {

    this.selectedUser  = this.userList.find(x=>x.User_ID == userid);
    this.selectedName = this.selectedUser.FirstName + ' ' + this.selectedUser.LastName;

  }

  selectProject(projectid)
  {

    this.selectedProject  = this.projectList.find(x=>x.Project_ID == projectid);
    this.project = this.selectedProject.Project;

  }

  selectParent(parentid)
  {

    this.selectedParent  = this.parentList.find(x=>x.Parent_ID == parentid);
    this.parentTask = this.selectedParent.Parent_Task;

  }
}


enum errorMessage{
  project = "Please select a Project !",
  user = "Please select a User !",
  task = "Please enter Task !",
  priority ="Please Select Priority !",
  parentTask ="Please enter Parent Task !",
  startDate = "Please enter Start Date !",
  endDate ="Please enter End Date !",
  dateCompare = "Start Date can not be greater than End Date !"
}

enum successMessage{
  saved = "Data Saved Sucessfully !",
  updated ="Task Updated Successfully !"
}