import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    MatTableModule,
    MatDialogModule
  ],
  exports: [
    MatTableModule,
    MatDialogModule
  ]
})

export class AngularMaterialModule {}