import * as assert from 'assert';
import * as path from 'path';
import { loadFileConfigs } from '../loadFileConfigs';
import defaultConfig from './__fixtures__/config/default.json';
import deploymentConfig from './__fixtures__/config/deployment/www.example.com.json';
import envConfig from './__fixtures__/config/env/production.json';
import userConfig from './__fixtures__/config/user/root.json';

describe('load-file-configs', () => {
  it('should load the configs that are available', () => {
    const process = {
      cwd: () => path.resolve(__dirname, '__fixtures__'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
      },
    };
    const actual = loadFileConfigs(process as unknown as NodeJS.Process);
    const expected = {
      defaultConfig,
      deploymentConfig,
      envConfig,
      userConfig,
    };
    assert.deepEqual(actual, expected);
  });

  it('should load default configs when not available', () => {
    const process = {
      cwd: () => path.resolve(__dirname, '__fixtures__'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'development',
        USER: 'root',
      },
    };
    const actual = loadFileConfigs(process as unknown as NodeJS.Process);
    const expected = {
      defaultConfig,
      deploymentConfig,
      envConfig: {},
      userConfig,
    };
    assert.deepEqual(actual, expected);
  });

  describe('alternative env varialble', () => {
    it('should load the configs that are available', () => {
      const process = {
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root',
        },
      };
      const actual = loadFileConfigs(process as unknown as NodeJS.Process);
      const expected = {
        defaultConfig,
        deploymentConfig,
        envConfig,
        userConfig,
      };
      assert.deepEqual(actual, expected);
    });

    it('should load default configs when not available', () => {
      const process = {
        cwd: () => path.resolve(__dirname, '__fixtures__'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'development',
          USER: 'root',
        },
      };
      const actual = loadFileConfigs(process as unknown as NodeJS.Process);
      const expected = {
        defaultConfig,
        deploymentConfig,
        envConfig: {},
        userConfig,
      };
      assert.deepEqual(actual, expected);
    });
  });
});
