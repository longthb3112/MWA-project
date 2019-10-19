import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserComponent }            from '../../pages/user/user.component';
import { TaskComponent }           from '../../pages/task/task.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from '../../services/api.interceptor';
import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  declarations: [
    UserComponent,
    TaskComponent,
    TypographyComponent,
    NotificationsComponent,
    LoginComponent,
    SignupComponent
  ],
   providers: [
     ApiInterceptor, 
       AuthService],
})

export class AdminLayoutModule {}
