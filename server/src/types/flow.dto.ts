import { Flow } from 'src/schema/flow.schema';

/**
 * 创建流水的传输实体
 */
export class CreateFlowDto {
    day: Date;
    name: string;
    description: string;
    money: number;
    type: string;
}


/**
 * 更新流水的传输实体
 */
export class UpdateFlowDto {
    day: Date;
    name: string;
    description: string;
    money: number;
    type: string;
}

export class FlowQuery {
    pageNum: number = 1;
    pageSize: number = 10;
    id?: number;
    startDay?: Date;
    endDay?: Date;
    name?: string;
    description?: string;
    type?: string;
}
