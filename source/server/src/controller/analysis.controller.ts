import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AnalysisProvider } from 'src/provider/analysis.provider';
import { DailyLineChartQuery, TypePieChartQuery } from 'src/types/analysis.dto';

@Controller('/api/analysis')
export class AnalysisController {
  constructor(private readonly analysisProvider: AnalysisProvider) {}

  @Post('/dailyLine')
  async dailyLine(
    @Headers('bookKey') bookKey = 'none',
    @Body() query: DailyLineChartQuery,
  ) {
    if ('none' === bookKey) {
      return {
        code: 333,
        message: '查询失败，请使用合法钥匙！',
      };
    }
    query.bookKey = bookKey;
    const data = await this.analysisProvider.dailyLineChart(query);
    return {
      code: 200,
      data: data,
    };
  }

  @Post('/typePie')
  async typePie(
    @Headers('bookKey') bookKey = 'none',
    @Body() query: TypePieChartQuery,
  ) {
    if ('none' === bookKey) {
      return {
        code: 333,
        message: '查询失败，请使用合法钥匙！',
      };
    }
    query.bookKey = bookKey;
    const data = await this.analysisProvider.typePieChart(query);
    return {
      code: 200,
      data: data,
    };
  }
}
