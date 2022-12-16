import $http from './index'
import type { Server } from '../types/model/server';

/**
 * 查询服务信息
 * @return Server
 */
export function getServerInfo(): Promise<Server> {
    return $http({ url: "/server", method: "get" })
}
