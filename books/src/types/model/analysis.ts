export interface DailyLineChartQuery {
  bookKey?: string;
  startDay?: Date;
  endDay?: Date;
}

export interface DailyLineChart {
  _id: Date;
  daySum: number;
}

export interface TypePieChartQuery {
  bookKey?: string;
  startDay?: Date;
  endDay?: Date;
}

export interface TypePieChart {
  _id: Date;
  typeSum: number;
}