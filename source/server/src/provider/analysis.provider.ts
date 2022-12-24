import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlowDocument } from 'src/schema/flow.schema';
import {
  DailyLineChartData,
  DailyLineChartQuery,
  TotalMoneyData,
  TypePieChartData,
  TypePieChartQuery,
} from 'src/types/analysis.dto';
import type { DailyLineChartMatch } from 'src/types/analysis.dto';

@Injectable()
export class AnalysisProvider {
  constructor(
    @InjectModel('Flow')
    private flowModel: Model<FlowDocument>,
  ) {}

  async dailyLineChart(
    query: DailyLineChartQuery,
  ): Promise<DailyLineChartData[]> {
    this.flowModel.count(query);

    const match: DailyLineChartMatch = {};
    match.bookKey = { $eq: query.bookKey };
    if (query.startDay && query.endDay) {
      match.day = {
        $gte: new Date(query.startDay),
        $lte: new Date(query.endDay),
      };
    }

    const res: DailyLineChartData[] = await this.flowModel
      .aggregate()
      .match(match)
      .group({
        _id: { $dateToString: { date: '$day', format: '%Y-%m-%d' } },
        daySum: { $sum: '$money' },
      })
      .sort({ _id: 1 })
      .exec();
    return res;
  }

  async typePieChart(query: TypePieChartQuery): Promise<TypePieChartData[]> {
    this.flowModel.count(query);

    const match: DailyLineChartMatch = {};
    match.bookKey = { $eq: query.bookKey };
    if (query.startDay && query.endDay) {
      match.day = {
        $gte: new Date(query.startDay),
        $lte: new Date(query.endDay),
      };
    }

    const res: TypePieChartData[] = await this.flowModel
      .aggregate()
      .match(match)
      .group({ _id: '$type', typeSum: { $sum: '$money' } })
      .sort({ _id: 1 })
      .exec();
    return res;
  }

  async getTotalMoney(bookKey: string) {
    const match = {
      bookKey: {
        $eq: bookKey,
      },
    };
    const data: TotalMoneyData[] = await this.flowModel
      .aggregate()
      .match(match)
      .group({ _id: '$bookKey', totalMoney: { $sum: '$money' } })
      .sort({ _id: 1 })
      .exec();
    return data[0].totalMoney || 0;
  }
}
