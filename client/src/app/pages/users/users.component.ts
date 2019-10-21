import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'users-cmp',
  templateUrl: 'users.component.html',

  moduleId: module.id,

  styles: ['table { width:100% }']
})

export class UsersComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private userService: UserService, public dialog: MatDialog, private authService: AuthService) {
    this.searchForm = formBuilder.group({
      'searchname': ['', Validators.required]
    });
  }



  search() {

    this.userService.searchByName({ name: this.searchForm.value.searchname }).subscribe((result) => {

      this.dataSource = result;
    });







  }
  msg: String;
  toggleAccountStatus(e, id, status) {
    this.userService.updateAccountStatus({ id: id, status: status }).subscribe(() => {

      this.showNotification('top', 'center', 'Account Status Changed...')

    });
  }

  showNotification(from, align, msg) {

    this.toastr.show(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><br />' + msg + '<br/><br/></span>',
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: "toast-" + from + "-" + align
      }
    );
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






