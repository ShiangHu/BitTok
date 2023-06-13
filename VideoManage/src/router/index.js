import Vue from 'vue'
import Router from 'vue-router'
import bgmList from "../page/bgmList";
import bgmUpload from "../page/bgmUpload";
import userList from "../page/userList";
import explain from "../page/explain";
import login from "../page/login";
import manage from "../page/manage";
import home from "../page/home";
import videoList from "../page/videoList";
import reportList from "../page/reportList";
import addUser from "../page/addUser.vue";
import dyUpload from "../page/dyUpload.vue";

Vue.use(Router)


const routes = [
    {
        path: '/',
        redirect: '/manage'
        // component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/userList',
            component: userList,
            meta: ['用户管理', '用户列表'],
        },{
            path: '/addUser',
            component: addUser,
            meta: ['用户管理', '增加用户'],
        }, {
            path: '/videoList',
            component: videoList,
            meta: ['短视频管理', '短视频列表'],
        }, {
            path: '/reportList',
            component: reportList,
            meta: ['举报管理', '举报列表'],
        }, {
            path: '/bgmList',
            component: bgmList,
            meta: ['短视频管理', '视频列表'],
        }, {
            path: '/bgmUpload',
            component: bgmUpload,
            meta: ['短视频管理', '添加视频'],
        }, {
            path: '/dyUpload',
            component: dyUpload,
            meta: ['短视频管理', '抖音爬取'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        }]
    }
]

export default new Router({
    routes,
    mode: 'history',
    base: '/',
    strict: process.env.NODE_ENV !== 'production',
})
