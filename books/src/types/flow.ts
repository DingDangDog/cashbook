export interface Flow {
    id: number;
    day: Date;
    name: string;
    description: string;
    money: number;
    type: string;
}

export interface FlowPage {
    pageNum: number;
    pageSize: number;
    dataList: Flow[];
    totalNum: number;
}

export class InitFlowPage {
    flowPage: FlowPage = {
        pageNum: 1,
        pageSize: 1,
        dataList: [{
            id: 1,
            day: new Date(),
            name: "测试",
            description: "测试流水",
            money: 1,
            type: "测试类型",
        }],
        totalNum: 1
    }
}