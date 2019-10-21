import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'notifications-cmp',
  moduleId: module.id,
  templateUrl: 'notifications.component.html'
})

export class NotificationsComponent implements OnInit {
  ngOnInit(): void {
    let user = this.userService.getUserdetail().subscribe((data) => {
      this.notificationsetting = data.data.notification;
    });

  }
  constructor(private toastr: ToastrService, private userService: UserService) { }


  notificationsetting: Boolean;

  changeNotificationSetting(e) {

    this.userService.updateNotificationSetting({ uname: localStorage.getItem('username'), notification: this.notificationsetting }).subscribe(() => {

      this.showNotification('top', 'center', 'Notification Setting Changed...')
      //this.notificationsetting = ;

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
}
