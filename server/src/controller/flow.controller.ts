import {
    Req,
    Body,
    Controller,
    Get,
    Post
} from '@nestjs/common';
import { FlowProvider } from 'src/provider/flow.provider';
import {
    CreateFlowDto, FlowQuery
} from 'src/types/flow.dto';

@Controller('/api/flow')
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

    
    /**
     * 创建一笔流水
     * 
     * @param req 
     * @param createDto 流水信息传输实体
     * @returns 
     */
     @Get('/getAll')
     async getAll(@Req() query: FlowQuery) {
         const data = await this.flowProvider.getAll(query);
         return {
             code: 200,
             data: {
                pageNum : 1,
                pageSize: data.length,
                totalNum: data.length,
                dataList: data
             },
         };
     }
 

}
