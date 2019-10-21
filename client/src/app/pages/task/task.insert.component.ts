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
  <h1 mat-dialog-title>Add</h1>
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
      <label for="startdate">Start Date</label>
        <div class="input-group">
      
          <input class="form-control" placeholder="yyyy-mm-dd"
          id="startdate"   name="startdate"  ngbDatepicker #d="ngbDatepicker" formControlName="startdate">
          <div class="input-group-append">
            <button class="nc-icon nc-calendar-60" (click)="d.toggle()" type="button"></button>
          </div>
       </div>
     </div>
     <div class="form-group col-md-6">
     <label for="startdate">End Date</label>
     <div class="input-group">
    
       <input class="form-control" placeholder="yyyy-mm-dd"
       id="duedate"   name="duedate"  ngbDatepicker #e="ngbDatepicker" formControlName="duedate">
       <div class="input-group-append">
         <button class="nc-icon nc-calendar-60" (click)="e.toggle()" type="button"></button>
       </div>
    </div>
  </div>
  </div>
  <div class="row">
  <div class="form-group col-md-6">
  <label for="status">Status</label>
              <select formControlName="status" class="form-control" id="status">
                  <option value="0">Open</option>
                  <option value="1">Closed</option>
              </select>
          </div>
<div class="form-group col-md-6">
<label for="priority">Priority</label>
<input type="number" class="form-control" id="priority" formControlName="priority">
</div>
  </div>
 <div class="row">
 <div class="form-group col-md-6">
<label for="percentage">Percentage</label>
<input type="number" class="form-control" id="percentage" formControlName="percentage">
</div>
 </div>

  </div>
  <div style="float:right">
  <button type="submit" class="btn btn-primary" [disabled]="!form.valid">Submit</button>
  <button type="submit" class="btn btn-secondary" (click)="close()">Cancel</button>
  </div>
  </form>
  `,
})
export class TaskInsertDialogComponent implements OnInit {

  form: FormGroup;
  
  constructor(

    private dialogRef: MatDialogRef<TaskInsertDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data) {

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      'taskData': this.formBuilder.group({
        'name': ['',[Validators.required]],
        'description': ['',[Validators.required]],
        'startdate': [,],        
        'duedate': [,],        
        'status': [,],
        'percentage': [,],
        'priority': [,]
      })
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
