import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'users-cmp',
  templateUrl: 'users.component.html',

  moduleId: module.id,

  styles: ['table { width:100% }']
})

export class UsersComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, public dialog: MatDialog, private authService: AuthService) {
    this.searchForm = formBuilder.group({
      'searchname': ['', Validators.required]
    });
  }



  search() {
    console.log('hi')
    console.log(this.searchForm.value.searchname)
    this.userService.searchByName({ name: this.searchForm.value.searchname }).subscribe((result) => {
      console.log(result);
      this.dataSource = result;
    });







  }

  toggleAccountStatus(e, id, status) {
    // console.log(e.target.value)
    this.userService.updateAccountStatus({ id: id, status: status }).subscribe();
  }


  displayedColumns: string[] = ['uname', 'fname', 'lname', 'description', 'actions'];


  dataSource;

  ngOnInit() {
    this.getUserDetail();

  }
  getUserDetail() {
    this.userService.getAllUsers({}).subscribe(result => {
      this.dataSource = result;
    });
  }





  /*
  deleteTask(row) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.userService.deleteTask({ username: this.authService.getUserName(), taskId: row._id }).subscribe(result => {
          if (result) {
            this.getUserDetail();
          }
        });
      }
    });
  }
  
    updateTask(row) {
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      console.log(row.startdate);
      console.log(row.duedate);
      dialogConfig.data = row;
      dialogConfig.height = "600px";
      dialogConfig.width = "600px";
      const dialogRef = this.dialog.open(TaskUpdateDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(value => {
        // console.log({username:this.authService.getUserName(),taskId:row._id,
        //   name:value.taskData.name,
        //   description:value.taskData.description,
        //   percentage:value.taskData.percentage,
        //   priority:value.taskData.priority,
        //   status:value.taskData.status,
        //   startdate:new Date(value.taskData.startdate.year,value.taskData.startdate.month - 1,value.taskData.startdate.day,0,0,0,0),
        //   duedate:new Date(value.taskData.duedate.year,value.taskData.duedate.month - 1,value.taskData.duedate.day,0,0,0,0)});
  
        this.userService.editTask({
          username: this.authService.getUserName(), taskId: row._id,
          name: value.taskData.name,
          description: value.taskData.description,
          percentage: value.taskData.percentage,
          priority: value.taskData.priority,
          status: value.taskData.status,
          startdate: new Date(value.taskData.startdate.year, value.taskData.startdate.month - 1 == 0 ? 1 : value.taskData.startdate.month - 1, value.taskData.startdate.day, 0, 0, 0, 0),
          duedate: new Date(value.taskData.duedate.year, value.taskData.duedate.month - 1 == 0 ? 1 : value.taskData.duedate.month - 1, value.taskData.duedate.day, 0, 0, 0, 0)
        })
          .subscribe(result => {
            if (result) {
              this.getUserDetail();
            }
          })
  
      });
    }*/
}






