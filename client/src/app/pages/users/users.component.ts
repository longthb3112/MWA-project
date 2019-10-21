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

}






