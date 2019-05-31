const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const mysql = require('mysql2');
const Redis1 = require('./lib/utils/redis')



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
    his.redisdb.subscriberon(this.subscriberOn, (channel, message) => {
      console.log('got ', channel);
      message = JSON.parse(message);
      console.log("constructor");

      // this.publishAndAdd(this.publishTO,{ id: message.id, range: 1000 } )
    });
  }
}
 new Cluster();