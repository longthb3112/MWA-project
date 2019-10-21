import { Component, OnInit,ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {TaskUpdateDialogComponent} from './task.update.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import {TaskInsertDialogComponent} from './task.insert.component';
declare interface TaskData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'task-cmp',
    moduleId: module.id,
    templateUrl: 'task.component.html',
    styles: ['table { width:100% }','#clickable{cursor: pointer;color:blue;}']
})
export class TaskComponent implements OnInit{
    constructor(private userService:UserService,public dialog: MatDialog,private authService:AuthService){

    }
    @ViewChild(MatPaginator,null) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'description', 'startdate', 'duedate','status','priority','percentage','timer','actions'];
  
  dataSource = null;
  
    ngOnInit(){ 
      this.getUserDetail();
    }
    getUserDetail(){
      this.userService.findAllTask({username:this.authService.getUserName()}) .subscribe(result =>{       
        var temp = result.tasks.map(function(task){
             return {...task}
       });
       this.dataSource = new MatTableDataSource<taskElement>(temp);
       this.dataSource.paginator = this.paginator;
      });
    }
    searchTask($event){
      let name = $event.target.value;
        this.userService.searchTask({username:this.authService.getUserName(),taskName:name}).subscribe(result =>{
        this.dataSource = new MatTableDataSource<taskElement>(result);
        this.dataSource.paginator = this.paginator;
      });
    }
    addTask(){
      const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.hasBackdrop = true;
        dialogConfig.height = "600px";
        dialogConfig.width = "600px";
        const dialogRef = this.dialog.open(TaskInsertDialogComponent,dialogConfig);
        
        dialogRef.afterClosed().subscribe(value => {
          // console.log({username:this.authService.getUserName(),
          //   name:value.taskData.name,
          //   description:value.taskData.description,
          //   percentage:value.taskData.percentage,
          //   priority:value.taskData.priority,
          //   status:value.taskData.status,
          //   startdate:new Date(value.taskData.startdate.year,value.taskData.startdate.month - 1 == 0 ? 1: value.taskData.startdate.month - 1,value.taskData.startdate.day,0,0,0,0),
          //   duedate:new Date(value.taskData.duedate.year,value.taskData.duedate.month - 1 == 0 ? 1:value.taskData.duedate.month - 1,value.taskData.duedate.day,0,0,0,0)})
          this.userService.addTask({username:this.authService.getUserName(),
            task:{name:value.taskData.name,
            description:value.taskData.description,
            percentage:value.taskData.percentage,
            priority:value.taskData.priority,
            status:value.taskData.status,
            startdate:new Date(value.taskData.startdate.year,value.taskData.startdate.month - 1 == 0 ? 1: value.taskData.startdate.month - 1,value.taskData.startdate.day,0,0,0,0),
            duedate:new Date(value.taskData.duedate.year,value.taskData.duedate.month - 1 == 0 ? 1:value.taskData.duedate.month - 1,value.taskData.duedate.day,0,0,0,0)}})
            .subscribe(result =>{
            if(result){
              this.getUserDetail();
            }
          })
        });
    }
    deleteTask(row) {
      const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
       
        dialogConfig.data = row;
        dialogConfig.height = "200px";
        dialogConfig.width = "280px";
        const dialogRef = this.dialog.open(DialogContentExampleDialog,dialogConfig);
    
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
    template: `
    <h1 mat-dialog-title>Delete</h1>
    <mat-dialog-content>Are you sure to delete this task?</mat-dialog-content>
   <div style="align:center">
    <mat-dialog-actions>
    <button mat-raised-button [mat-dialog-close]="true">Yes</button>
    <button mat-raised-button mat-dialog-close>No</button>
    
    </mat-dialog-actions></div>
    `
  })
  export class DialogContentExampleDialog {}
  export interface taskElement {
    name: string;
    description: string;
    startdate: Date;
    duedate: Date;
    status: Number;
    prioriry:Number;
    percentage:Number;
  }
  
  
  

