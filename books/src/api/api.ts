import $http from './index'
import type { FlowPage } from '../types/flow';

/**
 * 查询流水
 * @returns FlowPage
 */
export function getFlows(): Promise<FlowPage> {
    return $http({ url: "/flow/getAll", method: "get" })
}