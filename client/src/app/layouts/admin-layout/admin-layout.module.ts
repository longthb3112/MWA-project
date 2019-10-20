import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { UserComponent }            from '../../pages/user/user.component';
import { TaskComponent,DialogContentExampleDialog }           from '../../pages/task/task.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from '../../services/api.interceptor';
import { AuthService } from '../../services/auth.service';
/* Angular material 8 */
import { AngularMaterialModule } from '../../modules/angular.material/angular.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  declarations: [
    UserComponent,
    TaskComponent,
    TypographyComponent,
    NotificationsComponent,
    LoginComponent,
    SignupComponent,
    DialogContentExampleDialog
  ],
   providers: [
     ApiInterceptor, 
     AuthService],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   entryComponents: [DialogContentExampleDialog],
})

export class AdminLayoutModule {}
