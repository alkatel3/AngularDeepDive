import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { routes as userRountes } from "./users/users.routes"
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRountes,
        data: {
            message: 'Hello!'
        },
        resolve: { userName: resolveUserName }
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]