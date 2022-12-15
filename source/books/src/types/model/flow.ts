export interface Flow {
    id?: number;
    day?: Date;
    type?: string;
    bookKey?: string;
    payType?: string;
    money?: number;
    name?: string;
    description?: string;
}
/**
 * 创建流水的传输实体
 */
export interface CreateFlowDto {
    day?: Date;
    type?: string;
    payType?: string;
    money?: number;
    name?: string;
    description?: string;
}


/**
 * 更新流水的传输实体
 */
export interface UpdateFlowDto {
    day?: Date;
    type?: string;
    payType?: string;
    money?: number;
    name?: string;
    description?: string;
}

export class FlowQuery {
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
