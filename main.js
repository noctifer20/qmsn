const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const mysql = require('mysql2');
const Redis1 = require('./lib/utils/redis')


// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();


class Main {
  constructor() {
    this.id = process.env.id;
    this.msDb = this.connection();
    this.subscriberOn = 'message';
    this.publishTO = 'startTask';
    this.subscribeTo = 'taskEnd';
    this.redisdb = new Redis1(publisher, subscriber);
    this.initSubscriber()
  }

  initSubscriber(){
    this.redisdb.subscriberon(this.subscriberOn, (channel, message) => {
      console.log('got ', channel);
      message = JSON.parse(message);
      console.log("constructor");

      // this.publishAndAdd(this.publishTO,{ id: message.id, range: 1000 } )
    });
    this.redisdb.subscribe(this.subscribeTo);
     this.redisdb.publishAndAdd(this.publishTO,{range: 1000 } )

  }

  process() {}


  connection(){
    // return mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root',
    //   database: 'test'
    // });
  }

}
new Main()