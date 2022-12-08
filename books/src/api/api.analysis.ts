import $http from './index'
import type { DailyLineChartQuery, DailyLineChart } from '../types/model/analysis';

/**
* 查询每日消费曲线
*/
export function dailyLine(query: DailyLineChartQuery): Promise<DailyLineChart[]> {
  return $http({ url: "/analysis/dailyLine", method: "post", data: query })
}
