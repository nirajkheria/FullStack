import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagerServiceService, IUser, IProject} from '../project-manager-service.service';
import { finalize, first } from 'rxjs/operators';
import * as moment from 'moment';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers:[ProjectManagerServiceService],
})
export class AddProjectComponent implements OnInit {


  priority: number = 0;  
  formTitle: string = 'Add';
  isChecked: boolean = false;
  manager: string ='';
  project: string = '';

  startDate:string;
  endDate:string;

  public userList : IUser[];

  public projectList : IProject[];

  selectedUser : IUser = null;

  selectedName : string ='';  

  errorMessage:string = "";
  successMessage:string ="";
  isError:boolean = false;
  isSuccess:boolean = false;

  searchText: string='';
  searchUserText: string ='';

  selectedProject: IProject = null;

  constructor(private modalService: NgbModal, private _pmService: ProjectManagerServiceService,
    private orderPipe: OrderPipe) { }

  ngOnInit() {

    this.getProjects();

    this._pmService.getUsers<IUser[]>().subscribe((data :IUser[])=> this.userList = data),
    finalize(()=>{
    });
  }

  private getProjects()
  {
    this._pmService.getProjects<IProject[]>().subscribe((data :IProject[])=> this.projectList = data),
    finalize(()=>{
    });
  }

  enableDiasbleDates()
  {

    this.isChecked = !this.isChecked;
        if(this.isChecked)
        {
          this.startDate = moment(new Date()).format("YYYY-MM-DD");
          let tempDate = new Date();
          tempDate.setDate((new Date()).getDate() + 1);
          this.endDate = moment(tempDate).format("YYYY-MM-DD");
        }
        else
        {
          {
            this.startDate = null;
            this.endDate=null;
          }
        }

  }

  addProject()
  {

    this.validateData();
    if (this.isError) {
      return;
    } 
    
        let proj = <IProject>{};
        
        proj.Priority = this.priority;
        proj.Project  = this.project;
        proj.StartDate = this.startDate;
        proj.EndDate = this.endDate;
        if(this.selectedUser)
        {
        proj.Manager = {} as any;
        proj.Manager.User_ID = this.selectedUser.User_ID;
        proj.Manager.Employee_ID = this.selectedUser.Employee_ID;
        proj.Manager.FirstName = this.selectedUser.FirstName;
        proj.Manager.LastName = this.selectedUser.LastName;
        }
        if(this.formTitle == 'Add')
        {
        let result =this._pmService.addProject(proj).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.getProjects();
  
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
          proj.Project_ID = this.selectedProject.Project_ID;
        let result =this._pmService.updateProject(proj).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.getProjects();
  
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

        
      
    this.formTitle = 'Add';
  }

  resetForm()
  {
    this.project = '';
    this.selectedProject = null;
    this.formTitle = 'Add';
    this.selectedName = '';
    this.isChecked = false;
    this.priority = 0;
    this.startDate = null;
    this.endDate=null;
  }

  sortList(sortField)
  {
    this.projectList = this.orderPipe.transform(this.projectList, sortField);
  }


  open(content)
  {
    this.modalService.open(content, { centered: true ,size: 'lg' });
  }

  selectUser(userid)
  {

    this.selectedUser  = this.userList.find(x=>x.User_ID == userid);
    this.selectedName = this.selectedUser.FirstName + ' ' + this.selectedUser.LastName;

    this.modalService.dismissAll('Cross click');
  }

  selectProject(projectId)
  {

    this.selectedProject  = this.projectList.find(x=>x.Project_ID == projectId);
    this.project  = this.selectedProject.Project;
    this.priority = this.selectedProject.Priority;
    if(this.selectedProject.StartDate)
    {
    this.startDate = moment(this.selectedProject.StartDate).format("YYYY-MM-DD");
    this.endDate = moment(this.selectedProject.EndDate).format("YYYY-MM-DD");
    this.isChecked = true;
    }

    this.formTitle = 'Update';

        if(this.selectedProject.Manager)
        {

            this.selectedUser  = this.userList.find(x=>x.User_ID == this.selectedProject.Manager.User_ID);
            this.selectedName = this.selectedUser.FirstName + ' ' + this.selectedUser.LastName;
        }
  }

  private validateData(){
    if (this.project=="") {
      this.isError=true;
      this.errorMessage = errorMessage.project;
    } 
    else if (this.isChecked) {
      if (this.startDate == null || this.startDate == '') {
        this.isError=true;
        this.errorMessage = errorMessage.startDate;
      } 
      else if (this.endDate==null || this.endDate == '') {
        this.isError=true;
        this.errorMessage = errorMessage.endDate;
      } 
      else if(this.startDate>this.endDate){
        this.isError=true;
        this.errorMessage = errorMessage.dateCompare;
      }
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


}

enum errorMessage{
  project = "Please enter Project !",
  startDate = "Please enter Start Date !",
  endDate ="Please enter End Date !",
  dateCompare = "Start Date can not be greater than End Date !"
}

enum successMessage{
  saved = "Data Saved Sucessfully !",
  updated ="Data Updated Successfully !"
}
