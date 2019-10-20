import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {TaskUpdateDialogComponent} from './task.update.component';
declare interface TaskData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'task-cmp',
    moduleId: module.id,
    templateUrl: 'task.component.html',
    styles: ['table { width:100% }']
})

export class TaskComponent implements OnInit{
    constructor(private userService:UserService,public dialog: MatDialog,private authService:AuthService){

    }
  displayedColumns: string[] = ['name', 'description', 'startdate', 'duedate','status','priority','percentage','timer','actions'];
  dataSource = null;

    ngOnInit(){ 
      this.getUserDetail();
    }
    getUserDetail(){
      this.userService.getUserdetail().subscribe(result =>{
        this.dataSource = result.data.tasks.map(function(task){
             return {...task}
       })
      });
    }
    deleteTask(row) {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);
    
        dialogRef.afterClosed().subscribe(result => {
          if(result == true){
            this.userService.deleteTask({username:this.authService.getUserName(),taskId:row._id}).subscribe(result =>{
              if(result){
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
        const dialogRef = this.dialog.open(TaskUpdateDialogComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(value => {         
          // console.log({username:this.authService.getUserName(),taskId:row._id,
          //   name:value.taskData.name,
          //   description:value.taskData.description,
          //   percentage:value.taskData.percentage,
          //   priority:value.taskData.priority,
          //   status:value.taskData.status,
          //   startdate:new Date(value.taskData.startdate.year,value.taskData.startdate.month - 1,value.taskData.startdate.day,0,0,0,0),
          //   duedate:new Date(value.taskData.duedate.year,value.taskData.duedate.month - 1,value.taskData.duedate.day,0,0,0,0)});

            this.userService.editTask({username:this.authService.getUserName(),taskId:row._id,
              name:value.taskData.name,
              description:value.taskData.description,
              percentage:value.taskData.percentage,
              priority:value.taskData.priority,
              status:value.taskData.status,
              startdate:new Date(value.taskData.startdate.year,value.taskData.startdate.month - 1 == 0 ? 1: value.taskData.startdate.month - 1,value.taskData.startdate.day,0,0,0,0),
              duedate:new Date(value.taskData.duedate.year,value.taskData.duedate.month - 1 == 0 ? 1:value.taskData.duedate.month - 1,value.taskData.duedate.day,0,0,0,0)})
              .subscribe(result =>{
              if(result){
                this.getUserDetail();
              }
            })
       
      });
  }
}
  
  @Component({
    selector: 'dialog-content-example-dialog',
    template: `<mat-dialog-content>Are you sure?</mat-dialog-content>

    <mat-dialog-actions>
    <button mat-button mat-dialog-close>No</button>
    <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
    <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>`
  })
  export class DialogContentExampleDialog {}

  

