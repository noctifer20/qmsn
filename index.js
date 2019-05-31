require('dotenv').config();
const mysql = require('mysql2');
const redis = require("redis");



class Worker {
  generateRange() {}
  getEntities() {}
  processEntity() {}
  batchSave() {}
  logStash() {}
  [connection](){
    return mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });
  }
  async getConnectionPool(){
    return await this[connection]
  }

}



class Cluster {
  generateRange() {}
  getEntities() {}
  processEntity() {}
  batchSave() {}
  logStash() {}
  [connection](){
    return mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });
  }
  async getConnectionPool(){
    return await this[connection]
  }

}
