const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const mysql = require('mysql2');
const Redis1 = require('./lib/utils/redis')


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'testdb'
});
//
// connection.connect();
//
//
// connection.query('SELECT * from users where id = 159 limit 500', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });



/*subscriber.on('message', (channel, message) => {
  console.log('got ', channel);
  message = JSON.parse(message);
  publisher.publish('startTask', JSON.stringify({
    id: message.id,
    range: [1000, 2000]
  }))
});
subscriber.subscribe('taskEnd');*/

class Cluster {

  constructor(){
    this.subscriberOn = 'message';
    this.publisher = 'taskEnd';
    this.subscribeTo = 'startTask';
    this.redisdb = new Redis1(publisher, subscriber);
    this.initSubscriber();
    console.log(1);

  }

  initSubscriber(){
    this.redisdb.subscriberon(this.subscriberOn, (channel, message) => {
      console.log('got ', channel);
      message = JSON.parse(message);
      console.log("constructor", message.range , new Date().getHours(), new Date().getMinutes(), new Date().getMilliseconds())

      if(channel == 'limit'){
        console.log(message);

    }


      // this.publishAndAdd(this.publishTO,{ id: message.id, range: 1000 } )
    });
    this.redisdb.subscribe(this.subscribeTo);



    this.redisdb.publishAndAdd('server_' + Math.random(),{ ['server_' + Math.random()]: false } );


    // this.redisdb.publishAndAdd('taskEnd',{ limit: 1 } );


  }
  nextRange(){
    this.publishAndAdd('nextRange',  )
  }





}
 new Cluster();