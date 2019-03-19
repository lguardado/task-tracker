import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../models/task.model';
import { StatesEnum } from '../models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})

export class TaskCreateComponent implements OnInit {
  @Input() data: Task;
  @Output() addedEmitter: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancelEditEmitter: EventEmitter<void> = new EventEmitter<void>();
  statusDropdownOptions: any;

  constructor() {
  }

  ngOnInit() {
    this.statusDropdownOptions = this.getStatusDropdownOptions();
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

  get isFormInvalid() {
    return !this.data.name || !this.data.estimate;
  }
}
