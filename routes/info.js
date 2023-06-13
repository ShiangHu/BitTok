var express = require('express');
var router = express.Router();
var redisClient = require('../redis/index.js');
router.get('/getUser', async (req, res)=>{
    var user = await redisClient.get('users')
    var users = JSON.parse(user).userInfo
    for(let i = 0; i < users.length; i ++){
        if(users[i].sid === req.body.sid){
            res.json(JSON.parse(users[i])).end();
            break
        }
    }
    // console.log(u)

})
module.exports = router;
