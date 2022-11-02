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

export class FlowQuery {
    id?: number;
    day?: Date;
    name?: string;
    description?: string;
    type?: string;
}
