import { loadConfig } from 'src/utils/common';

export interface Config {
  mongoUrl: string;
}

export const config: Config = {
  mongoUrl: loadConfig(
    'mongodb.url',
    'mongodb://172.25.208.1:27017/cashbook?authSource=admin',
  ),
};
