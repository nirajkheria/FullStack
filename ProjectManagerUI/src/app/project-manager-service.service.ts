import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerServiceService {
  API_URL = environment.apiUrl;
  constructor(private _http:HttpClient) { }

  getUsers<IUser>(): Observable<IUser>
  {
    //return this._http.get(this.API_URL).pipe(map((response:Response)=>response.json()));
    let lst : Observable<IUser>;
    lst = this._http.get<IUser>(this.API_URL + 'api/UsersTabs');
    return lst;
  }

  getProjects<IProject>(): Observable<IProject>
  {
    //return this._http.get(this.API_URL).pipe(map((response:Response)=>response.json()));
    let lst : Observable<IProject>;
    lst = this._http.get<IProject>(this.API_URL + 'api/ProjectTabs');
    return lst;
  }

  getParentTasks<IParentTask>(): Observable<IParentTask>
  {
    //return this._http.get(this.API_URL).pipe(map((response:Response)=>response.json()));
    let lst : Observable<IParentTask>;
    lst = this._http.get<IParentTask>(this.API_URL + 'api/ParentTaskTabs');
    return lst;
  }

  addProject(project:IProject){
    return this._http.post(this.API_URL + 'api/ProjectTabs',project,     
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
        return data;
      }));
  }

  updateProject(project:IProject){
    return this._http.put(this.API_URL + 'api/ProjectTabs',project,     
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
      return data;
    }));
  }

  addUser(user:IUser){
    return this._http.post(this.API_URL + 'api/UsersTabs',user,     
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
        return data;
      }));
  }

  updateUser(user:IUser){
    return this._http.put(this.API_URL + 'api/UsersTabs',user,     
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
      return data;
    }));
  }

  addParentTask(task:IParentTask){
    return this._http.post(this.API_URL + 'api/ParentTaskTabs',task,     
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
        return data;
      }));
  }

  getTaskList<ITask>(): Observable<ITask>
  {
    let lst : Observable<ITask>;
    lst = this._http.get<ITask>(this.API_URL + 'api/TaskTabs');
    return lst;
  }

  addTask(task:ITask){
    return this._http.post(this.API_URL + 'api/TaskTabs',task,     
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
        return data;
      }));
  }

  updateTask(task:ITask){
    return this._http.put(this.API_URL + 'api/TaskTabs',task,     
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}).pipe(map(data => {
      return data;
    }));
  }
}

export interface IUser {
  User_ID: number;
  Employee_ID:number;
  FirstName:string;
  LastName:string;
  Project_ID: number;
  Task_ID: number;
}
export interface IProject{
  Project_ID: number;
  Project : string;
  StartDate: string;
  EndDate : string;
  Priority: number;
  Manager: IUser;

  NoofTasks: number;
  Completed: number;
}

export interface IParentTask{
  Parent_ID: number;
  Parent_Task: string;
}

export interface ITask{
  Task_ID: number;
  Parent_ID: number;
  Project_ID: number;
  Task : string;
  StartDate: string;
  EndDate : string;
  Priority: number;
  Status : string;
  ParentTaskName: string;

  User: IUser;
  Project: IProject;
  ParentTask: IParentTask;
}

