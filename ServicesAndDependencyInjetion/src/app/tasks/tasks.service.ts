import { Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";

@Injectable({
    providedIn: 'root',

})
export class TasksService {
    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();

    addTask(taskData: { title: string, description: string }) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTask) => [...oldTask, newTask])
    }

    updateTaskStatus(tastId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === tastId ? { ...task, status: newStatus } : task))
    }
}