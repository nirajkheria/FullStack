import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule} from '@angular/forms';
import { ViewTaskComponent } from './view-task.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { DataFilterPipe } from '../data-filter.pipe';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ITask } from '../project-manager-service.service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule, OrderModule ],
      declarations: [ ViewTaskComponent,DataFilterPipe, AddTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('End Task',()=>{
    it('Should End a Task',()=>{
      component.selectedTask = {} as ITask;
      component.endTask(0);
      expect(component.isSuccess).toBe(true);
    })      

  });

});
