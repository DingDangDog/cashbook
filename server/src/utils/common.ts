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

  return process.env[envKey] || defaultValue;
};
