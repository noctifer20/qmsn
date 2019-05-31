const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();


// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();


class Worker {
  constructor() {
    this.id = process.env.id;
    this.msDb = this.connection();
    subscriber.on('message', (channel, message) => {
      message = JSON.parse(message);
      if (message.id === this.id)
        this.process();
    });
    subscriber.subscribe('startTask');
    publisher.publish('taskEnd', JSON.stringify({id: 'worker_1', range: [0, 1000]}))
  }

  process() {}
  generateRange() {}
  getEntities() {}
  processEntity() {}
  batchSave() {}
  logStash() {}
  connection(){
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });
  }

}
