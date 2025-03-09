import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {
  value: 'open' | 'in-progress' | 'done',
  textStatus: TaskStatus,
  text: string
}[]

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>('task-status-options')

export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    textStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    textStatus: 'IN_PROGRESS',
    text: 'In-Progres'
  },
  {
    value: 'done',
    textStatus: 'DONE',
    text: 'Completed'
  },
]

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
