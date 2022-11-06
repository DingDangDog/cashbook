import $http from './index'
import type { Page } from '../types/page';
import type { Flow, FlowQuery, CreateFlowDto, UpdateFlowDto } from '../types/flow';

/**
 * 查询流水
 * @returns FlowPage
 */
export function getAll(): Promise<Flow> {
    return $http({ url: "/flow/getAll", method: "get" })
}

/**
 * 查询流水分页
 * @returns Page<Flow>
 */
export function getFlowPage(query: FlowQuery): Promise<Page<Flow>> {
    return $http({ url: "/flow", method: "get", params: query })
}


/**
 * 新增流水
 * @returns Page<Flow>
 */
export function create(createDto: CreateFlowDto) {
    return $http({ url: "/flow", method: "post", data: createDto })
}


/**
 * 修改流水
 * @returns Page<Flow>
 */
export function update(id: number, updateDto: UpdateFlowDto) {
    return $http({ url: "/flow/" + id, method: "put", data: updateDto })
}


/**
 * 删除流水
 * @returns Page<Flow>
 */
export function deleteFlow(id: number) {
    return $http({ url: "/flow/" + id, method: "delete" })
}