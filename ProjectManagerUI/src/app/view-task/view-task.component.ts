import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, first } from 'rxjs/operators';
import { IProject, ITask, ProjectManagerServiceService } from '../project-manager-service.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[ProjectManagerServiceService]
})
export class ViewTaskComponent implements OnInit {


  searchProjectText: string ='';
  project: string ='';
  selectedProject: IProject = null;
  public projectList : IProject[];

  public taskList : ITask[];
  public projectTaskList: ITask[];
  isSuccess:boolean=false;
  isSearch:boolean=false;
  successMessage:string ="";
  selectedTask :ITask = null;
  modalButtonText :string ="End";

  constructor(private modalService: NgbModal, private _pmService: ProjectManagerServiceService,
    private orderPipe: OrderPipe) {}

  ngOnInit() {
    this.getTaskList();
    this.getProjects();
  }
  open(content)
  {
    this.modalService.open(content, { centered: true ,size: 'lg' });
  }

  openEndTask(content)
  {
    this.modalService.open(content, { centered: true ,size: 'sm' });
  }
  close(result: any)
  {
    //this.getTaskList();
  }

  private getProjects()
  {
    this._pmService.getProjects<IProject[]>().subscribe((data :IProject[])=> this.projectList = data),
    finalize(()=>{
    });
  }

  private getTaskList(){
    this._pmService.getTaskList<ITask[]>().subscribe((data :ITask[])=> this.taskList = data),
    finalize(()=>{
    })
  }

  selectProject(projectid)
  {
    this.selectedProject  = this.projectList.find(x=>x.Project_ID == projectid);
    this.project = this.selectedProject.Project;
    this.projectTaskList = [];
    this.taskList.forEach(element => {
       if(element.Project_ID == projectid && element.Status != 'Completed')
       {
        this.projectTaskList.push(element);
       }
      });
  }

  sortList(sortField)
  {
    this.projectTaskList = this.orderPipe.transform(this.projectTaskList, sortField);
  }

  editTask(id){
    this.selectedTask = this.projectTaskList.find(x=>x.Task_ID === id);
  }

  endTask(taskID){
    if (taskID ==null) {
      return;
    }
    this.selectedTask.Status = 'Completed';

    let result =this._pmService.updateTask(this.selectedTask).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.getTaskList();
              this.projectTaskList = this.projectTaskList.filter(x => x.Task_ID != 
                this.selectedTask.Task_ID);
            }
          },
          error => {
          });

        if ( result)
        {
        this.isSuccess =true;
        this.successMessage =successMessage.ended;
        this.modalService.dismissAll('Cross click');
        }
        setTimeout(()=>{ 
          this.isSuccess =false;
          this.successMessage ="";
          this.getTaskList();
         }, 2000);
  }
}

enum successMessage{
  saved = "Data Saved Sucessfully !",
  updated ="Task Updated Successfully !",
  ended ="Task Ended Successfully !"
}