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
  keys(prefix){
    return new Promise((resolve, reject) =>{
      this.publisher.keys(prefix,(err, result)=> {
        if(err) reject(err)
        resolve(result)
      })
    })
  }
  get(prefix){
    return new Promise((resolve, reject) =>{
      this.publisher.get(prefix,(err, result)=> {
        if(err) reject(err);
        resolve(JSON.parse(result))
      })
    })
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