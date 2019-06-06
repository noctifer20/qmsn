const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const Redis1 = require('./lib/utils/redis');


class Main {
  constructor() {
    this.id = process.env.id;
    this.limit= 0;
    this.subscriberOn = 'message';
    this.subscribeTo = 'taskEnd';
    this.redisdb = new Redis1(publisher, subscriber);
    this.defaultFilter = 'where gender = 1';
    this.initSubscriber();
    this.redisdb.publishAndAdd('filter',{ filter: this.defaultFilter } );

  }

  async initSubscriber(){
    this.redisdb.subscriberon(this.subscriberOn, (channel, message) => {
      message = JSON.parse(message);

      if (channel === 'taskEnd') {
        this.incrementLimit(message.serverName)
      }
    });

    this.redisdb.subscribe(this.subscribeTo);
    this.redisdb.subscribe('startServer');
    this.checkingServerToReady();

  }

  checkingServerToReady(){
    const interval =  setInterval(async () => {
      const serverName = await this.redisdb.keys('server_*');
      const { length } = serverName;
      if (length ===  4) {
        for(let j = 0; j < length; j++){
          const server = await this.redisdb.get(serverName[j]);
          if (!server[serverName[j]]) {
            this.redisdb.get(serverName[j]);
            this.limit  = j + 1;
            this.redisdb.publishAndAdd(serverName[j],{ offset: this.limit} );
            this.redisdb.publishAndAdd(serverName[j],{ [serverName[j]]: true } );
          }
        }
        console.log("start",  new Date().getHours(), new Date().getMinutes(), new Date().getMilliseconds())


        clearInterval(interval);

      }
    }, 1000);

  }

  async incrementLimit(serverName){
    const { filter }= await this.redisdb.get('filter');
    if (!filter) {
      this.limit = 0;
      console.log("end",  new Date().getHours(), new Date().getMinutes(), new Date().getMilliseconds())

      return;
    }

    this.limit += 1;
    this.redisdb.publishAndAdd(serverName,{ offset: this.limit } );
  }

}
new Main();