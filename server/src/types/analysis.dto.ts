/**
 * 每日消费曲线前端传入查询条件
 */
export class DailyLineChartQuery {
  bookKey: string;
  startDay: Date;
  endDay: Date;
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
  startDay: Date;
  endDay: Date;
}

export interface TypePieChartMatch {
  bookKey?: any;
  day?: any;
}

export interface TypePieChartData {
  _id: any;
  typeSum: number;
}
