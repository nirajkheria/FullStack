import { Component, OnInit } from '@angular/core';
import { IUser, ProjectManagerServiceService } from '../project-manager-service.service';
import { finalize, first } from 'rxjs/operators';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  // styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formTitle: string = 'Add';
  firstName: string = '';
  lastName: string = '';
  employeeID: number;

  public userList : IUser[];
  selectedUser : IUser = null;

  errorMessage:string = "";
  successMessage:string ="";
  isError:boolean = false;
  isSuccess:boolean = false;

  searchText: string='';

  constructor(private _pmService: ProjectManagerServiceService, private orderPipe: OrderPipe) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers()
  {
    this._pmService.getUsers<IUser[]>().subscribe((data :IUser[])=> this.userList = data),
    finalize(()=>{
    });
  }

  selectUser(userid)
  {

    this.selectedUser  = this.userList.find(x=>x.User_ID == userid);
    this.firstName = this.selectedUser.FirstName;
    this.lastName = this.selectedUser.LastName;
    this.employeeID = this.selectedUser.Employee_ID;
    this.formTitle = 'Update';

  }

  resetForm()
  {
    this.firstName = '';
    this.selectedUser = null;
    this.formTitle = 'Add';
    this.lastName = '';
    this.employeeID = null;
  }

  addUser()
  {

    this.validateData();
    if (this.isError) {
      return;
    } 
    
        let user = <IUser>{};
        
        user.FirstName = this.firstName;
        user.LastName  = this.lastName;
        user.Employee_ID = this.employeeID;
        
        if(this.formTitle == 'Add')
        {
        let result =this._pmService.addUser(user).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.getUsers();
  
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
          user.User_ID = this.selectedUser.User_ID;
        let result =this._pmService.updateUser(user).pipe(first())
        .subscribe(
          data => {
            if (data) {
              this.getUsers();
  
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

  private validateData(){
    if (this.firstName=="") {
      this.isError=true;
      this.errorMessage = errorMessage.FirstName;
    } 
    else if (this.lastName=="") {
      this.isError=true;
      this.errorMessage = errorMessage.LastName;
    } 
    else if (this.employeeID == null || this.employeeID == 0) {
      this.isError=true;
      this.errorMessage = errorMessage.EmployeeID;
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

  sortList(sortField)
  {
    this.userList = this.orderPipe.transform(this.userList, sortField);
  }

}

enum errorMessage{
  FirstName = "Please enter First Name !",
  LastName = "Please enter Last Name !",
  EmployeeID ="Employee ID is required and should be greater than 0 !",
}

enum successMessage{
  saved = "Data Saved Sucessfully !",
  updated ="Data Updated Successfully !"
}
