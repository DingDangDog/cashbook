import {
    Req,
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';
import { FlowProvider } from 'src/provider/flow.provider';
import {
    CreateFlowDto
} from 'src/types/flow.dto';

@Controller('/api/manager/flow')
export class FlowController {
    constructor(
        private readonly flowProvider: FlowProvider
    ) { }

    /**
     * 创建一笔流水
     * 
     * @param req 
     * @param createDto 流水信息传输实体
     * @returns 
     */
    @Post('/create')
    async create(@Req() req: any, @Body() createDto: CreateFlowDto) {
        const data = await this.flowProvider.create(createDto);
        return {
            statusCode: 200,
            data,
        };
    }

}
