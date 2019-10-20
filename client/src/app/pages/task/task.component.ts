import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatDialog} from '@angular/material/dialog';
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
    constructor(private userService:UserService,public dialog: MatDialog){

    }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  dataSource = ELEMENT_DATA;

    public tableData1: TaskData;
    public tableData2: TaskData;
    user = {
        username: '',
        email: '',
        firstname: '',
        lastname: ''
      };
    ngOnInit(){
       
    }
    openDialog(row) {
        const dialogRef = this.dialog.open(DialogContentExampleDialog);
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
}
export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  @Component({
    selector: 'dialog-content-example-dialog',
    template: 'test',
  })
  export class DialogContentExampleDialog {}
