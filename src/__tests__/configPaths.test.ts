/**
 * Created by tushar on 30/12/17.
 */
import * as assert from 'assert';
import { configPaths } from '../configPaths';

describe('config-paths', () => {
  describe('default', () => {
    it('should return config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).defaultConfig;
      const expected = '/app/www.bravo.com/server/config/default.json';

      assert.deepEqual(actual, expected);
    });
  });

  describe('ENV:NODE_ENV', () => {
    it('should return actual config path', () => {
      const process = {
        env: { NODE_ENV: 'production' },
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).envConfig;
      const expected = '/app/www.bravo.com/server/config/env/production.json';

      assert.deepEqual(actual, expected);
    });
    it('should return default config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).envConfig;
      const expected = '/app/www.bravo.com/server/config/env/default.json';

      assert.deepEqual(actual, expected);
    });
  });

  describe('DEPLOYMENT', () => {
    it('should return actual config path', () => {
      const process = {
        env: { DEPLOYMENT: 'www.example.com' },
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).deploymentConfig;
      const expected = '/app/www.bravo.com/server/config/deployment/www.example.com.json';

      assert.deepEqual(actual, expected);
    });
    it('should return default config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).deploymentConfig;
      const expected = '/app/www.bravo.com/server/config/deployment/default.json';

      assert.deepEqual(actual, expected);
    });
  });

  describe('USER', () => {
    it('should return actual config path', () => {
      const process = {
        env: { USER: 'root' },
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).userConfig;
      const expected = '/app/www.bravo.com/server/config/user/root.json';

      assert.deepEqual(actual, expected);
    });
    it('should return default config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).userConfig;
      const expected = '/app/www.bravo.com/server/config/user/default.json';

      assert.deepEqual(actual, expected);
    });
  });

  describe('USERNAME', () => {
    it('should return actual config path', () => {
      const process = {
        env: { USERNAME: 'root' },
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).userConfig;
      const expected = '/app/www.bravo.com/server/config/user/root.json';

      assert.deepEqual(actual, expected);
    });
    it('should return default config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server',
      };
      const actual = configPaths(process as unknown as NodeJS.Process).userConfig;
      const expected = '/app/www.bravo.com/server/config/user/default.json';

      assert.deepEqual(actual, expected);
    });
  });

  describe('ENV:NODE_CONFIG_DIR', () => {
    it('should set base config dir', () => {
      const process = {
        env: { NODE_ENV: 'production', NODE_CONFIG_TS_DIR: './/main/config' },
        cwd: () => '/root',
      };

      const actual = configPaths(process as unknown as NodeJS.Process);
      const expected = {
        defaultConfig: '/root/main/config/default.json',
        deploymentConfig: '/root/main/config/deployment/default.json',
        envConfig: '/root/main/config/env/production.json',
        userConfig: '/root/main/config/user/default.json',
      };

      assert.deepEqual(actual, expected);
    });
  });
});
