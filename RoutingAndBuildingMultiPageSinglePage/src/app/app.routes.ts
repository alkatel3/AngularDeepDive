import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { routes as userRountes } from "./users/users.routes"
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRountes,
        data: {
            message: 'Hello!'
        },
        resolve: { userName: resolveUserName },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]