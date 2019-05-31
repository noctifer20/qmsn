const redis = require('redis');
const publisher = redis.createClient();
const subscriber = redis.createClient();
const mysql = require('mysql2');


subscriber.on('message', (channel, message) => {
  console.log('got ', channel);
  message = JSON.parse(message);
  publisher.publish('startTask', JSON.stringify({
    id: message.id,
    range: [1000, 2000]
  }))
});
subscriber.subscribe('taskEnd');
