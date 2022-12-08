export class DailyLineChartQuery {
  bookKey: string;
  startDay: Date;
  endDay: Date;
}

export interface DailyLineChartMatch {
  bookKey?: any;
  day?: any;
}
