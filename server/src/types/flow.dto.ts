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