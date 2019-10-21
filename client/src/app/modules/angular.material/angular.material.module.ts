import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule,MatNativeDateModule,MatButtonModule,MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  exports: [
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})

export class AngularMaterialModule {}