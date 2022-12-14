/**
 * 每日消费曲线前端传入查询条件
 */
export class DailyLineChartQuery {
  bookKey: string;
  startDay: string;
  endDay: string;
}
/**
 * 每日消费曲线Mongo查询条件规则实体
 */
export interface DailyLineChartMatch {
  bookKey?: any;
  day?: any;
}
/**
 * 每日消费曲线数据实体
 */
export interface DailyLineChartData {
  _id: any;
  daySum: number;
}

/**
 * 消费类型拼图统计相关
 */
export class TypePieChartQuery {
  bookKey: string;
  startDay: string;
  endDay: string;
}

export interface TypePieChartMatch {
  bookKey?: string;
  day?: any;
}

export interface TypePieChartData {
  _id: any;
  typeSum: number;
}

export interface TotalMoneyData {
  _id?: any;
  totalMoney?: number;
}
