import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../models/task.model';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})

export class TaskCreateComponent {
  @Input() data: Task;
  @Output() addedEmitter: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() cancelEditEmitter: EventEmitter<void> = new EventEmitter<void>();
  statusDropdownOptions: any;

  constructor() {
  }

  onAddClick() {
    this.addedEmitter.emit(this.data);
  }

  onCancelClick() {
    this.cancelEditEmitter.emit();
  }

  get isFormInvalid() {
    return !this.data.name || !this.data.estimate;
  }
}
