/**
 * 创建流水的传输实体
 */
export class CreateFlowDto {
    userId: string;
    day: Date;
    name: string;
    type: string;
    money: number;
    payType: string;
    description: string;
}


/**
 * 更新流水的传输实体
 */
export class UpdateFlowDto {
    userId: string;
    day: Date;
    type: string;
    money: number;
    payType: string;
    name: string;
    description: string;
}

export class FlowQuery {
    userId: string;
    pageNum: number = 1;
    pageSize: number = 10;
    id?: number;
    startDay?: Date;
    endDay?: Date;
    type?: string;
    payType?: string;
    name?: string;
    description?: string;
}
