var express = require('express');
var router = express.Router();
var redisClient = require('../redis/index.js');

router.get('/', async (req, res)=>{
    var videoList = await redisClient.get('videoData')
    // console.log(JSON.parse(videoList))
    res.json(JSON.parse(videoList)).end();
})

router.post('/addLike', async (req, res)=>{
    var videoList = await redisClient.get('videoData')
    videoL = JSON.parse(videoList).list
    for(let i = 0; i < videoL.length; i++){
        if (videoL[i].url === req.body.url) {
            videoL[i].perLikes = (parseInt(videoL[i].perLikes) + 1).toString()
            break
        }
    }
    if(await redisClient.exists('videoData') === true){
        await redisClient.remove('videoData')
    }
    var storageJSON = {
        "list": videoL
    }
    await redisClient.set('videoData', storageJSON)
    var users = await redisClient.get('users')
    userL = JSON.parse(users).userInfo
    for (let i = 0; i < userL.length; i++){
        if ( userL[i].sid===req.body.user ){
            likeList = userL[i].history.liked
            let flag = 0;
            for( let j = 0; j < likeList.length; j++){
                if ( likeList[i] === req.body.url ) flag = 1;
            }
            if(!flag){
                userL[i].history.liked.push(req.body.url)
            }
            break
        }
    }
    storageJSON = {
        "userInfo": userL
    }
    if(await redisClient.exists('users') === true){
        await redisClient.remove('users')
    }
    await redisClient.set('users', storageJSON)
})

router.post('/reduceLike', async (req, res)=>{
    var videoList = await redisClient.get('videoData')
    videoL = JSON.parse(videoList).list
    for(let i = 0; i < videoL.length; i++){
        if (videoL[i].url === req.body.url) {
            videoL[i].perLikes = (parseInt(videoL[i].perLikes) - 1).toString()
            break
        }
    }
    if(await redisClient.exists('videoData') === true){
        await redisClient.remove('videoData')
    }
    var storageJSON = {
        "list": videoL
    }
    await redisClient.set('videoData', storageJSON)
    var users = await redisClient.get('users')
    userL = JSON.parse(users).userInfo
    for (let i = 0; i < userL.length; i++){
        if ( userL[i].sid === req.body.user ){
            let index = userL[i].history.liked.indexOf(req.body.url)
            userL[i].history.liked.splice(index, 1)
            break
        }
    }
    storageJSON = {
        "userInfo": userL
    }
    if(await redisClient.exists('users') === true){
        await redisClient.remove('users')
    }
    await redisClient.set('users', storageJSON)
})

router.post('/recordTime', async (req, res)=>{
    var user = await redisClient.get('users')
    var users = JSON.parse(user).userInfo
    var videoList = await redisClient.get('videoData')
    videoL = JSON.parse(videoList).list
    for (let i = 0; i < users.length; i++){
        if(users[i].sid === req.body.user){
            // console.log(req.body.count)
            if(req.body.count > 1) {
                for (let j = 0; j < videoL.length; j++) {
                    if (videoL[j].url === req.body.url) {
                        users[i].history.playTime[req.body.url] = videoL[j].time
                    }
                }
            }
            else{
                if( users[i].history.playTime[req.body.url] !== undefined){
                    if( users[i].history.playTime[req.body.url] < req.body.time) {
                        users[i].history.playTime[req.body.url] = req.body.time
                    }
                }else{
                    users[i].history.playTime[req.body.url] = req.body.time
                }
            }
            break;
        }
    }
    // console.log(users[0].history.playTime[req.body.url])
    var storageJSON = {
        "userInfo": users
    }
    if(await redisClient.exists('users') === true){
        await redisClient.remove('users')
    }
    await redisClient.set('users', storageJSON)
    res.send('0');
})

module.exports = router;
