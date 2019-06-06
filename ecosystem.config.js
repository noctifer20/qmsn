module.exports = {
  apps : [{
    name        : "worker",
    script      : "./main.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  },{
    name       : "cluster-app",
    script     : "./cluster.js",
    instances  : 4,
    exec_mode  : "cluster"
  }]
}