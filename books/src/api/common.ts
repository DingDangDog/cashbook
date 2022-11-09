/**
 * 校验客户端是什么机型
 * @returns 
 */
export const deviceAgent = (): any => {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || 'pc';
}


const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/**
 *  生成随机字符串
 */
export const generateMixed = (n: number) => {
    let a = "";
    for (let i = 0; i < n; i++) {
        a += chars[Math.ceil(Math.random() * 61)];
    }
    return a;
}