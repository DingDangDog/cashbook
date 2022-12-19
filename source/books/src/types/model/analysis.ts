export interface DailyLineChartQuery {
  bookKey?: string;
  startDay?: string;
  endDay?: string;
}

export interface DailyLineChart {
  _id: string;
  daySum: number;
}

export interface TypePieChartQuery {
  bookKey?: string;
  startDay?: string;
  endDay?: string;
}

export interface TypePieChart {
  _id: string;
  typeSum: number;
}