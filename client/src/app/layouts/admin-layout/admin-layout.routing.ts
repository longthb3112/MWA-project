import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import { TaskComponent } from '../../pages/task/task.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { AuthGuard } from '../../services/auth.guard.service';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { UsersComponent } from '../../pages/users/users.component';
import { AdminGuard } from 'app/services/admin.guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'typography', component: TypographyComponent, canActivate: [AuthGuard] },
    { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
];
