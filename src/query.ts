export class Query<TData> {
  readonly timeCompleted: number;
  readonly data: TData;

  constructor(data: TData) {
    this.data = data;
    this.timeCompleted = Date.now();
  }
}
