import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlowDocument } from 'src/schema/flow.schema';
import { DailyLineChartQuery } from 'src/types/analysis.dto';
import type { DailyLineChartMatch } from 'src/types/analysis.dto';

@Injectable()
export class AnalysisProvider {
  constructor(
    @InjectModel('Flow')
    private flowModel: Model<FlowDocument>,
  ) {}

  async dailyLineChart(query: DailyLineChartQuery): Promise<any> {
    this.flowModel.count(query);

    const match: DailyLineChartMatch = {};
    match.bookKey = { $eq: query.bookKey };
    if (query.startDay && query.endDay) {
      match.day = { $gte: query.startDay, $lte: query.endDay };
    }

    const res = await this.flowModel
      .aggregate()
      .match(match)
      .group({ _id: '$day', daySum: { $sum: '$money' } })
      .sort({ _id: 1 })
      .exec();
    return res;
  }
}
