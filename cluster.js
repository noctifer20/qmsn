const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const mysql = require('mysql2');
const Redis1 = require('./lib/utils/redis');


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'qmsn'
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
    this.limit = 1000;
    this.busy = false
    this.serverName = 'server_' + Math.random();
    this.initSubscriber();

  }

  initSubscriber(){
    this.redisdb.subscriberon(this.subscriberOn, (channel, message) => {
      message = JSON.parse(message);
      if (message.offset && message.offset !== this.offset && !this.busy) {
        this.offset = message.offset;
        this.proccesingData(message.offset);

      }

    });
    this.redisdb.subscribe(this.subscribeTo);
    this.redisdb.subscribe('offset');
    this.redisdb.subscribe(this.serverName);
    this.redisdb.publishAndAdd(this.serverName,{ [this.serverName]: false });


  }
  async proccesingData(offset){

    const filter = await this.redisdb.get('filter');
    try {
        this.busy = true;

      connection.connect();
      connection.query(`SELECT * from user ${filter} limit ${offset * this.limit}`, async (error, results) => {
        if (error) throw error;
        if (!results.length) {

          this.redisdb.publishAndAdd('filter', { filter: 0 });
        }

        await Promise.all(results.map(async agent => {
          // console.log(agent.id);
          await new Promise((resolve, reject)=>{
            connection.query(`update  user set gender = 0 where id=${agent.id}`, (err)=>{
              if(err) reject(err)
              resolve();
            });
          })
        })).then(()=>{
          this.busy= false;
          console.log('----------------END ------------------------')
          this.redisdb.publishAndAdd('taskEnd', { serverName: this.serverName });

           connection.end();

        });


      });
      } catch (e) {
      console.log('errrrrrrr', e)
    }

  }

}
 new Cluster();