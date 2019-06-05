const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const mysql = require('mysql2');
const Redis1 = require('./lib/utils/redis')



/*const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'testdb'
});

// connection.connect();
//
//
// connection.query('SELECT * from users where id = 159 limit 500', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });*/



class Main {
  constructor() {
    this.id = process.env.id;
    // this.msDb = this.connection();
    this.subscriberOn = 'message';
    this.publishTO = 'startTask';
    this.subscribeTo = 'taskEnd';
    this.redisdb = new Redis1(publisher, subscriber);
    this.initSubscriber();

  }

  async initSubscriber(){
    this.redisdb.subscriberon(this.subscriberOn, (channel, message) => {
      console.log('got ', channel);
      message = JSON.parse(message);
      console.log("main-----", channel, message);




      // this.publishAndAdd(this.publishTO,{ id: message.id, range: 1000 } )
    });

    this.redisdb.subscribe(this.subscribeTo);
    this.redisdb.subscribe('startServer');
    this.redisdb.publishAndAdd(this.publishTO,{ range: 1000 } );

    console.log('blllll-----', await this.redisdb.keys('server_*'));


  }

  process() {}


  // connection(){
  //   return mysql.createConnection({
  //     host: 'localhost',
  //     user: 'root',
  //     password: 1111,
  //     database: 'testdb'
  //   });
  // }

}
new Main()