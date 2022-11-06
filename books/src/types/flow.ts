export interface Flow {
    id: number;
    day: Date;
    name?: string;
    description?: string;
    money: number;
    type: string;
}
/**
 * 创建流水的传输实体
 */
 export interface CreateFlowDto {
    day: Date;
    name: string;
    description: string;
    money: number;
    type: string;
}


/**
 * 更新流水的传输实体
 */
export interface UpdateFlowDto {
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
