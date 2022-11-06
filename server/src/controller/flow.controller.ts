import {
    Req,
    Query,
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param
} from '@nestjs/common';
import { FlowProvider } from 'src/provider/flow.provider';
import {
    CreateFlowDto, UpdateFlowDto, FlowQuery
} from 'src/types/flow.dto';

@Controller('/api/flow')
export class FlowController {
    constructor(
        private readonly flowProvider: FlowProvider
    ) { }


    /**
     * 创建一笔流水
     * 
     * @returns 分页数据
     */
    @Get()
    async getPage(
        @Query('pageNum') pageNum = 1,
        @Query('pageSize') pageSize = 10,
        @Query('startDay') startDay,
        @Query('endDay') endDay,
        @Query('type') type,
        @Query('payType') payType,
        @Query('name') name,
        @Query('description') description,
        @Query('id') id
    ) {
        const query: FlowQuery = {
            pageNum: pageNum,
            pageSize: pageSize,
            id: id,
            startDay: startDay,
            endDay: endDay,
            type: type,
            payType: payType,
            name: name,
            description: description
        }
        const data = await this.flowProvider.getPage(query);
        return {
            code: 200,
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
    @Post()
    async create(@Req() req: any, @Body() createDto: CreateFlowDto) {
        const data = await this.flowProvider.create(createDto);
        return {
            code: 200,
            data,
        };
    }



    /**
     * 更新一笔流水
     * 
     * @param req 
     * @param updateDto 流水信息传输实体
     * @returns 
     */
    @Put('/:id')
    async update(@Param('id') id: number, @Body() updateDto: UpdateFlowDto) {
        const data = await this.flowProvider.update(id, updateDto);
        return {
            code: 200,
            data,
        };
    }



    /**
     * 删除一笔流水
     * 
     * @param id 流水id 
     * @returns 
     */
    @Delete('/:id')
    async delete(@Param("id") id: number) {
        const data = await this.flowProvider.delete(id);
        return {
            code: 200,
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
                pageNum: 1,
                pageSize: data.length,
                totalNum: data.length,
                dataList: data
            },
        };
    }


}
