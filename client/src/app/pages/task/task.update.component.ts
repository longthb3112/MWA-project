import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Injectable } from '@angular/core';

@Component({
  selector: 'task-update-dialog',
  template: `

  <form [formGroup]="form" (ngSubmit)="save()">
  <div formGroupName="taskData">
   
    <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" formControlName="name">
    </div>
<div class="form-group">
    <label for="description">Description</label>
    <input type="text" class="form-control" id="description" formControlName="description">
</div>
    
    <div class="row">
      <div class="form-group col-md-6">
        <div class="input-group">
          <input class="form-control" placeholder="yyyy-mm-dd"
          id="startdate"   name="startdate"  ngbDatepicker #d="ngbDatepicker" formControlName="startdate">
          <div class="input-group-append">
            <button class="nc-icon nc-calendar-60" (click)="d.toggle()" type="button"></button>
          </div>
       </div>
     </div>
     <div class="form-group col-md-6">
     <div class="input-group">
       <input class="form-control" placeholder="yyyy-mm-dd"
       id="duedate"   name="duedate"  ngbDatepicker #e="ngbDatepicker" formControlName="duedate">
       <div class="input-group-append">
         <button class="nc-icon nc-calendar-60" (click)="e.toggle()" type="button"></button>
       </div>
    </div>
  </div>
  </div>
  <div class="form-group col-md-6">
  <label for="status">Status</label>
  <input type="text" class="form-control" id="status" formControlName="status">
</div>
<div class="form-group col-md-6">
<label for="priority">Priority</label>
<input type="text" class="form-control" id="priority" formControlName="priority">
</div>
<div class="form-group col-md-6">
<label for="percentage">Percentage</label>
<input type="text" class="form-control" id="percentage" formControlName="percentage">
</div>
  </div>
  <div style="float:right">
  <button type="submit" class="btn btn-primary" [disabled]="!form.valid">Submit</button>
  <button type="submit" class="btn btn-secondary" (click)="close()">Cancel</button>
  </div>
  </form>
  `,
})
export class TaskUpdateDialogComponent implements OnInit {

  form: FormGroup;

  private name: string;
  private description: string;
  private startdate: Date;
  private duedate: Date;
  private status: Number;
  private percentage: Number;
  private priority:Number;
  
  constructor(

    private dialogRef: MatDialogRef<TaskUpdateDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {
    this.name = data.name;
    this.description = data.description;
    this.startdate = new Date(data.startdate) ;
   
    this.duedate = new Date(data.duedate);
 
    this.percentage = data.percentage;
    this.priority = data.priority;
    this.status = data.status;  
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      'taskData': this.formBuilder.group({
        'name': [this.name,],
        'description': [this.description,],
        'startdate': [{day:this.startdate.getDate(),month:this.startdate.getMonth() + 1,year:this.startdate.getFullYear()},],        
        'duedate': [{day:this.duedate.getDate(),month:this.duedate.getMonth() + 1,year:this.duedate.getFullYear()},],        
        'status': [this.status,],
        'percentage': [this.percentage,],
        'priority': [this.priority,]
      })
    });
  }

  save() {
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
