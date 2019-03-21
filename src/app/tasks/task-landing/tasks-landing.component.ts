import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';
import { Counters } from '../models/counter.model';

@Component({
  selector: 'app-tasks-landing',
  templateUrl: './tasks-landing.component.html',
  styleUrls: ['./tasks-landing.component.scss']
})
export class TasksLandingComponent implements OnInit, OnDestroy {
  tasks: Task[];
  newTask: Task;
  isCreatingTask: boolean;
  states = [];
  getTasksSubscriber: any;
  deleteSubscriber: any;
  countersSubscriber: any;
  lastTaskId: number;
  counters: Counters;

  constructor(private _tasksService: TasksService) {
    this.subscribeCounters();
  }

  ngOnInit() {
    this.initializeCounters();
    this.getTasks();
    this.states = this._tasksService.getStatesArray();
  }

  onHandleDeleteEvent(event) {
    this.deleteSubscriber = this._tasksService.deleteTask(event).subscribe((res) => {
      this.tasks = res;
    }, error => console.log('error deleting task: ' + error));
  }

  onHandleCreatedEvent(event) {
    this.lastTaskId++;
    this.newTask.id = this.lastTaskId;
    this.newTask.name = event.name;
    this.newTask.description = event.description;
    this.newTask.state = this.states[0];
    this.newTask.estimate = event.estimate;
    this._tasksService.addTask(this.newTask).subscribe((res) => {
      this.tasks = res;
    }, error => console.log('error adding task: ' + error));
    this.newTask = new Task();
    this.isCreatingTask = false;
  }

  getTasks() {
    this.getTasksSubscriber = this._tasksService.getTasks().subscribe((res) => {
      this.tasks = res;
      this.tasks = this.sortTaks();
      this.lastTaskId = this.getLastId();
      this.updateTotals();
    }, error => console.log('error getting tasks: ' + error));
  }

  sortTaks() {
    return this.tasks.sort((a: any, b: any) => a.id - b.id);
  }

  subscribeCounters() {
    this.countersSubscriber = this._tasksService.counters$.subscribe((counters) => {
      this.counters = counters;
    });
  }

  getLastId() {
    if (this.tasks.length) {
      return this.tasks[this.tasks.length - 1].id;
    } else {
      return 0;
    }
  }

  onCreateNewTaskClick() {
    this.newTask = new Task();
    this.isCreatingTask = true;
  }

  initializeCounters() {
    this.counters = {
      totalCompleted: 0,
      totalInProgress: 0,
      totalPlanned: 0
    };
  }

  ngOnDestroy() {
    this.getTasksSubscriber.unsubscribe();
    this.deleteSubscriber.unsubscribe();
    this.countersSubscriber.unsubscribe();
  }

  updateTotals() {
    this._tasksService.updateTotals();
  }
}
