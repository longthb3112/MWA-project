import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import { TaskComponent } from '../../pages/task/task.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'task',          component: TaskComponent },
    { path: 'user',           component: UserComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent }
];
