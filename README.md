# BitTok
An interactive audio-visual stimuli platform based on the Tiktok Mod for cognitive and affective neuroscience study

# Backend
The backend code is written by `express.js`. In the current directory, run `node app.js` to start. There are 5 main files in the current directory. These are `bin`, `public`,`redis`,`routes`, `app.js`.
### Bin Directory
The default config file in this project. Currently, there is only one `www.js` file in this directory.
### public
There are some backend static resources in this directory, like images, js script, Cascading Style Sheets, and Store static video resources as an HTTP server.
### redis
This project does not use a relational storage database, but instead uses a non-relational database for Redis storage. For example, the following are redis config file and JSON key value pair stored in Redis.
##### redis.conf
```yaml
protected-mode yes
port 6379
tcp-backlog 511
timeout 0
tcp-keepalive 300
daemonize yes
supervised no
pidfile /var/run/redis/redis-server.pid
loglevel notice
logfile /var/log/redis/redis-server.log
databases 16
always-show-logo yes
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir /root/redis_db
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-diskless-sync-delay 5
repl-disable-tcp-nodelay no
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-log-slower-than 10000
slowlog-max-len 128
latency-monitor-threshold 0
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
client-output-buffer-limit normal 0 0 0
client-output-buffer-limit replica 256mb 64mb 60
client-output-buffer-limit pubsub 32mb 8mb 60
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
```
##### key:users
value
```json
{
    "userInfo": [
        {
            "name": "test",
            "avathor": "http://127.0.0.1:10000/static/img/default.jpg",
            "sid": "P00000000",
            "password": "test",
            "desc": "this is a test account",
            "age": "00",
            "sex": "女",
            "school": "ahu",
            "history": {
                "liked": [],
                "playTime": {
                    "https://dyapi.pxy.iccmc.cc/static/videos/ec8ce29f26a6438c4ca86f14619f326c": 2.976803
                }
            }
        }
    ]
}
```
##### key: videoData
value:
```json
{
    "list": [
        {
            "name": "testVideo？",
            "url": "https://dyapi.pxy.iccmc.cc/static/videos/ec8ce29f26a6438c4ca86f14619f326c",
            "emotion": "消极",
            "time": 80.688912,
            "perLikes": "0"
        }
    ]
}
```
Rerunning the project requires resetting the path which is existing in `redis.conf`.

There is a redis tool `index.js` in `redis` directory, where can help you use and config redis more easily and conveniently.
### routes
The project was built using the Restful API, and the routes directory stores some routes.

Firstly, we need to request the package we need
```js
var express = require('express');
var router = express.Router();
var redisClient = require('../redis/index.js');
var multer = require('multer')
var path = require("path");
var fs = require("fs");
```
Then, we can use `router.post()` or `router.get()` and so on to define our own routes.

### app.js
This configuration includes cross domain issues, cookie storage, and other functions, which are the default startup files for the express backend. You can continue to configure interceptors and other functions. You can continue to configure interceptors and other functions.
```js
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
}
app.use(allowCrossDomain);
```


# Main test end
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### How to start main test end?
```
cd VideoManage
npm install or yarn(recommend)
npm run dev
```
### General framework of the main view end.
The management page template written by Vue can add, delete, modify, check users and videos, and record and view user behavior (likes, viewing time). Like most management perspectives, this is a universal set of templates.

# Tested end
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### How to start tested end?
```
cd brainvideo_webapp
yarn install
### Compiles and hot-reloads for development
yarn serve
### Compiles and minifies for production
yarn build
### Lints and fixes files
yarn lint
```
### How to read and play videos?
We use `vue-video-player` to implement this function.
You can see [vue-video-player](https://www.npmjs.com/package/vue-video-player) to learn details.
### How to record and watch video visually?
This is a important function in this project. When the video slides up or down, we record the duration of this time. Here is the sample code and algorithm.
```js
saveVideoTime(page) {
    const time = this.$refs.videos[page].getPlayerTime();
    const count = this.$refs.videos[page].getCount();
    POST('/video/recordTime', {url: this.dataList[page].url, time: time,count: count, user: localStorage.getItem('sid')})
    // console.log(page, time);
},
```
```js
onPlayerTimeupdate(player) {
    if(this.lastTime > player.currentTime()){
      this.count++
    }
    this.lastTime = player.currentTime()
    // console.log(this.count)
},
getPlayerTime() {
    return this.$refs.videoPlayer.player.currentTime();
},
getCount() {
    return this.count
},
setCount() {
    this.count = 0
}
```

# Summarize
Both the trial and trial ends are built using `Vue`, and further development can be found by reading the `Vue` documentation to learn more.
