var express = require('express');
var router = express.Router();
var redisClient = require('../redis/index.js');
var multer = require('multer')
var path = require("path");
var fs = require("fs");
var videosPath = 'D:\\Project\\Javascript\\brainvideo_express\\public\\videos'

let upload = multer({dest: 'public/videos/'})

function deleteDir(url){
    var files = [];

    if( fs.existsSync(url) ) {  //判断给定的路径是否存在

        files = fs.readdirSync(url);   //返回文件和子目录的数组
        files.forEach(function(file,index){
            var curPath = path.join(url,file);

            if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteDir(curPath);
            } else {
                fs.unlinkSync(curPath);    //是指定文件，则删除
            }

        });

        fs.rmdirSync(url); //清除文件夹
    }else{
        console.log("给定的路径不存在！");
    }

}
function deleteFile(url,name){
    var files = [];

    if( fs.existsSync(url) ) {    //判断给定的路径是否存在

        files = fs.readdirSync(url);    //返回文件和子目录的数组

        files.forEach(function(file,index){

            var curPath = path.join(url,file);

            if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteFile(curPath,name);
            } else {

                if(file.indexOf(name)>-1){    //是指定文件，则删除
                    fs.unlinkSync(curPath);
                    console.log("删除文件："+curPath);
                }
            }
        });
    }else{
        console.log("给定的路径不存在！");
    }

}
router.post('/bgmUpload', upload.single("video"), async (req, res, next)=>{
    // console.log(req.file)
    var json = {
        Code: 0,
        Data: 'https://dyapi.pxy.iccmc.cc/static/videos/' + req.file.filename
    }
    // console.log(req.file)
    res.json(json).end();
})

router.post('/uploadProcess', async(req, res)=>{
    var data = {
        name: req.body.name,
        url: req.body.url,
        emotion: req.body.emotion,
        time: req.body.videoTime,
        perLikes: '0'
    }
    var videoList = await redisClient.get('videoData')
    var newJson = JSON.parse(videoList).list
    newJson[newJson.length] = data
    var storageJSON = {
        "list": newJson
    }
    if(await redisClient.exists('videoData') === true){
        await redisClient.remove('videoData')
    }
    await redisClient.set('videoData', storageJSON)
    res.send("0")
})

router.post('/bgmDelete', async(req, res)=>{
    var url = req.body.url
    var videoList = await redisClient.get('videoData')
    var newJson = JSON.parse(videoList).list
    for(var i = 0; i < newJson.length; i++){
        if(newJson[i].url === url){
            if(i === newJson.length - 1) newJson.pop()
            else{
                for(var j = i; j < newJson.length - 1; j++){
                    newJson[j] = newJson[j + 1];
                }
                newJson.pop()
            }
        }
    }
    var storageJSON = {
        "list": newJson
    }
    if(await redisClient.exists('videoData') === true){
        await redisClient.remove('videoData')
    }
    await redisClient.set('videoData', storageJSON)
    var filename = url.split('/')[5];
    // console.log(videosPath + '\\' + filename)
    deleteFile(videosPath, filename)
    res.send("0")
})

router.post('/bgmUp', async (req, res)=>{
    //console.log(req.body.index)
    currLoc = req.body.index
    targLoc = currLoc - 1
    var videoList = await redisClient.get('videoData')
    var newJson = JSON.parse(videoList).list
    let temp = newJson[currLoc]
    newJson[currLoc] = newJson[targLoc]
    newJson[targLoc] = temp
    var storageJSON = {
        "list": newJson
    }
    if(await redisClient.exists('videoData') === true){
        await redisClient.remove('videoData')
    }
    await redisClient.set('videoData', storageJSON)
    res.send('0')
})
router.get('/clearCache', async(req, res)=>{
    var dirs = fs.readdirSync(videosPath);

    var videoList = await redisClient.get('videoData')
    var newJson = JSON.parse(videoList).list
    var existList = [];
    var i = 0;
    for(i = 0; i < newJson.length; i++){
        existList.push(newJson[i].url.split('/')[5])
    }
    var diff = dirs.filter(function (val) { return !(existList.indexOf(val) > -1) })
    for(i=0; i < diff.length; i++){
        deleteFile(videosPath, diff[i])
    }
    res.send('0')
})

router.get('/loadVideo', async(req, res)=>{
    var videoList = await redisClient.get('videoData')
    // console.log(JSON.parse(videoList))
    res.json(JSON.parse(videoList)).end();
})

router.get('/userList', async(req, res)=>{
    var videoList = await redisClient.get('users')
    // console.log(JSON.parse(videoList))
    res.json(JSON.parse(videoList)).end();
})

router.post('/addUser', async(req, res)=>{
    var users = await redisClient.get('users')
    var usersList = JSON.parse(users).userInfo
    var flag = 0
    for(var i = 0; i < usersList.length; i++){
        if(usersList[i].sid === req.body.sid){
            break
        }
        if(i === usersList.length - 1 && usersList[i].sid !== req.body.sid){
            usersList.push(req.body)
            var storageJSON = {
                "userInfo": usersList
            }
            if(await redisClient.exists('users') === true){
                await redisClient.remove('users')
            }
            await redisClient.set('users', storageJSON)
            flag = 1
            break
        }
    }
    if(usersList.length === 0){
        usersList.push(req.body)
        storageJSON = {
            "userInfo": usersList
        }
        if(await redisClient.exists('users') === true){
            await redisClient.remove('users')
        }
        await redisClient.set('users', storageJSON)
        flag = 1
    }
    if(flag === 0){
        res.send('0')
    }else if(flag === 1){
        res.send("1")
    }
})

router.post('/deleteUser',async(req, res)=>{
    var users = await redisClient.get('users')
    var usersList = JSON.parse(users).userInfo
    var sid = req.body.sid
    for(var i = 0; i < usersList.length; i++){
        if(usersList[i].sid === sid){
            if(i === usersList.length - 1) usersList.pop()
            else{
                for(var j = i; j < usersList.length - 1; j++){
                    usersList[j] = usersList[j + 1];
                }
                usersList.pop()
            }
        }
    }
    var storageJSON = {
        "userInfo": usersList
    }
    if(await redisClient.exists('users') === true){
        await redisClient.remove('users')
    }
    await redisClient.set('users', storageJSON)
    res.send('0');
})
module.exports = router;
