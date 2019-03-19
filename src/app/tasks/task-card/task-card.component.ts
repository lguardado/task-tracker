import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { StatesEnum } from '../models/task.model';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() data: Task;
  @Output() deletedEmitter: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() addedEmitter: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancelEditEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() stateChangeEmitter: EventEmitter<void> = new EventEmitter<void>();
  currentState: String;
  states = StatesEnum;
  statusDropdownOptions: any;

  constructor() {}

  ngOnInit() {
    this.statusDropdownOptions = this.getStatusDropdownOptions();
    this.updateCurrentState(this.data.state);
  }

  onStateClick(stateKey) {
    this.updateCurrentState(stateKey);
    this.stateChangeEmitter.emit();
  }

  onDeleteClick(task: any) {
    this.deletedEmitter.emit(task);
  }

  onAddClick() {
    this.addedEmitter.emit(this.data);
  }

  onCancelClick() {
    this.cancelEditEmitter.emit();
  }

  getStatusDropdownOptions() {
    return Object.keys(StatesEnum);
  }

  updateCurrentState(state: string) {
    this.currentState = state;
    this.data.state = state;
  }
}
