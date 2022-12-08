export interface DailyLineChartQuery {
  bookKey?: string;
  startDay?: Date;
  endDay?: Date;
}

export interface DailyLineChart {
  _id: Date;
  daySum: number;
}