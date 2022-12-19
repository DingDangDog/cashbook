/**
 * 获得配置项的值
 * @param key 配置项的 key，可以通过 . 来选择子项，比如 app.port
 * @param defaultValue 默认值
 */
export const loadConfig = (key: string, defaultValue?: any) => {
  const envKey =
    'CASHBOOK_' +
    key
      .split('.')
      .map((x) => x.toUpperCase())
      .join('_');

  console.log(envKey + ':' + process.env[envKey]);
  return process.env[envKey] || defaultValue;
};

/**
 * 日期格式化方法
 *
 * @author DingDangDog
 * @param format 格式化后的日期格式，标准格式：YYYY-MM-dd HH:mm:ss。
 * @param date 待格式化的日期，可以是string或Date类型
 * @return 标准格式结果示例：2022-12-08 17:30:00
 */
export const dateFormater = (format: string, date: string | Date) => {
  date = new Date(date);

  const dataRegIndexs = [0, 1, 2, 3, 4, 5];
  const dataRegKeys = ['Y+', 'M+', 'd+', 'H+', 'm+', 's+'];
  const dataItem = [
    date.getFullYear().toString(),
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : (date.getMonth() + 1).toString(),
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
    date.getHours().toString(),
    date.getMinutes().toString(),
    date.getSeconds().toString(),
  ];

  let ret;
  for (const index in dataRegIndexs) {
    ret = new RegExp('(' + dataRegKeys[index] + ')').exec(format);
    if (ret) {
      format = format.replace(
        ret[1],
        ret[1].length == 1
          ? dataItem[index]
          : dataItem[index].padStart(ret[1].length, '0'),
      );
    }
  }
  return format;
};
