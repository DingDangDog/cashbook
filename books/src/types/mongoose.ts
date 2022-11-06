// mongoose工具操作数据库，返回的数据封装
/**
 * 更新数据
 */
export interface UpdateResult {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: string;
    upsertedCount: number;
    matchedCount: number;
}
/**
 * 删除数据
 */
export interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
}