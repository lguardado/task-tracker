export class Task {
  id: number;
  name: string;
  description: string;
  state: string;
  estimate: number;
}

export class Counters {
  totalCompleted: number;
  totalInProgress: number;
  totalPlanned: number;
}

export enum StatesEnum {
  PLANNED = 'Planned',
  IN_PROGRESS = 'In progress',
  COMPLETED = 'Completed'
}
