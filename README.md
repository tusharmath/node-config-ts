node-config-ts 
=======
[![Build Status](https://travis-ci.org/tusharmath/node-config-ts.svg?branch=master)](https://travis-ci.org/tusharmath/node-config-ts)
[![Greenkeeper badge](https://badges.greenkeeper.io/tusharmath/node-config-ts.svg)](https://greenkeeper.io/)

A simple node configuration manager for typescript based projects. 
**It automatically generates typings**

## Usage

1. Install package 
    ```bash
    npm i node-config-ts
    ```

2. Add a `postinstall` step
    ```json
    {
         "scripts" : {
             "postinstall": "node-config-ts"
         }
    }
    ```

3. Create a `config` directory inside your project's root folder and add a `default.json` file. A typical folder structure looks as follows —  
    ```
    root/
    └── config/
        └── default.json
    ```
    `default.json` should contain your application's configuration

4. Create typings
    ```bash
    npm install
    ```
    A new `Config.d.ts` will be generated automatically. This file could be ignored from git as it gets automatically generated based on the structure of `default.json`

5. Import and use `node-config-ts`
    
    ```typescript
    import {config} from 'node-config-ts'
   
    console.log(config) // logs the config data from default.json    
    ```

## Directory Structure
Configurations are loaded via config files that are written in JSON format for now. A typical project looks like this —

```
root/
└── config/
    ├── Config.d.ts
    ├── default.json
    ├── deployment/
    │   ├── staging.example.com.json
    │   ├── production.example.com.json
    │   └── qa.example.com.json
    ├── env/
    │   └── production.json
    └── user/
        ├── ec2-user.json
        ├── andy.json
        └── sara.json
```

There are three directories in which a project can have configurations — `deployment`, `env` and `user`. These directories can have multiple files inside them and based on the environment variables an appropriate config file is selected for overriding the base `default.json`. For instance if the `NODE_ENV` variable is set to `production` the `env/production.json` configuration will be merged with `default.json`. Similarly if `DEPLOYMENT` env variable is set to `staging.example.com` then `deployment/staging.example.com.json`  is merged with the other configs. Here is a table for environment to directory mapping —


| **process.env** | **directory**      |
|-----------------|--------------------|
| NODE_ENV        | /config/env        |
| DEPLOYMENT      | /config/deployment |
| USER            | /config/user       |

## Configuration Priority

The configs are merged in the following order of priority —

1. Commandline
2. User
3. Deployment
4. Environment

The command line arguments can override  all the configuration params. This is useful when you want to start a node server by passing the port externally  —

```bash
node server.js --port 3000
```

In the above case even if the `default.json` has a port setting of `9000` the cli argument can override it
```json
// default.json
{
    "port": 9000
}
```
