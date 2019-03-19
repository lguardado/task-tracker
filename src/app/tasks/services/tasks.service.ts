import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import MockTasks from '../mock/tasks.mock';
import { Task, StatesEnum, Counters } from '../models/task.model';

@Injectable()
export class TasksService {
  private tasks: Task[];
  counters$: Subject<any> = new Subject();
  counters: Counters;

  constructor() {
    this.initializeTotals();
  }

  getTasks(): Observable<Task[]> {
    return Observable.create((observer) => {
      try {
        this.tasks = MockTasks;
        this.updateTotals();
        observer.next(this.tasks);
      } catch (err) {
        observer.error(err);
      }
    });
  }

  deleteTask(task: Task): Observable<Task[]> {
    return Observable.create((observer) => {
      try {
        this.tasks = this.tasks.filter(element => task.id !== element.id);
        this.updateTotals();
        observer.next(this.tasks);
      } catch (err) {
        observer.error(err);
      }
    });
  }

  addTask(taskToAdd: Task): Observable<Task[]> {
    return Observable.create((observer) => {
      try {
        this.tasks.push(taskToAdd);
        this.updateTotals();
        observer.next(this.tasks);
      } catch (err) {
        observer.error(err);
      }
    });
  }

  updateTotals() {
    this.initializeTotals();
    this.tasks.map(task => {
      switch (StatesEnum[task.state]) {
        case StatesEnum.COMPLETED:
          this.counters.totalCompleted += task.estimate;
          break;
        case StatesEnum.PLANNED:
          this.counters.totalPlanned += task.estimate;
          break;
        case StatesEnum.IN_PROGRESS:
          this.counters.totalInProgress += task.estimate;
          break;
      }
    });
    this.counters$.next(this.counters);
  }

  initializeTotals() {
    this.counters = {
      totalCompleted: 0,
      totalInProgress: 0,
      totalPlanned: 0
    };
  }
}
