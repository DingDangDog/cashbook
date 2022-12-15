import $http from './index'
import type { Book, CreateBookDto } from '../types/model/book';

/**
 * 查询用户信息
 * @returns User
 */
export function getBook(bookKey: string): Promise<Book> {
  return $http({ url: "/book/" + bookKey, method: "get"})
}


/**
* 注册用户
* @returns User
*/
export function createBook(createDto: CreateBookDto): Promise<Book> {
  return $http({ url: "/book/createBook", method: "post", data: createDto })
}
