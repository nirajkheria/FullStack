import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import {HttpClient} from '@angular/common/http';
import { of, from } from 'rxjs';
import { ProjectManagerServiceService, IProject, IUser } from '../project-manager-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataFilterPipe } from '../data-filter.pipe';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let service :ProjectManagerServiceService;
  let modalService: NgbModal;
  let http :HttpClient;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {

    service = new ProjectManagerServiceService(http);
    component = new AddTaskComponent(service, modalService);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddTaskComponent, DataFilterPipe],
      providers: []
    })
      .compileComponents();
  }));

  describe('Add new Task in the Task List',()=>{
    it('Should Add a new Task',()=>{
      component.isError=false;
      component.EditTask =null;
      component.addTask();
      expect(component.isSuccess).toBe(false);
    })      

  });

});
