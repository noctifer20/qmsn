class Redis {
  constructor(publisher, subscriber){
    this.publisher = publisher;
    this.subscriber = subscriber;
  }

  publish(to, data){
    return this.publisher.publish(to, JSON.stringify({
      ...data
    }))
  }
  add(to, data){
    this.publisher.set(to, JSON.stringify({
      ...data
    }))
  }
  publishAndAdd(to, data){
    this.publish(to, data);
    this.add(to, data);
  }
  subscribe(subscribeTo){
    this.subscriber.subscribe(subscribeTo);
  }
  subscriberon(subscriberOn, callback){
    this.subscriber.on(subscriberOn, callback);
  }

}

module.exports = Redis;