<template>
  <div class="mine">
    <!-- 顶部背景模块 -->
    <div class="mine-top" :style="bgPic">
      <!-- 右上角菜单按钮 -->
<!--      <div class="menu-box">-->
<!--        <span class="iconfont icon-caidan"></span>-->
<!--      </div>-->
    </div>
    <!-- 个人信息模块 -->
    <div class="mine-wrap">
      <div class="mine-content">
        <!-- 头像行 -->
        <div class="info">
          <img
            :src="userInfo.avathor"
            style="
              height: 100px;
              width: 100px;
              border-radius: 50%;
              margin-right: 20px;
            "
          />
          <div class="info-right">
            <button class="btn" @click="exitLogin">退出登录</button>
<!--            <button class="btn">-->
<!--              <span class="iconfont icon-jiahao1"></span> 朋友-->
<!--            </button>-->
          </div>
        </div>
        <!-- 用户信息 -->
        <div class="desc">
          <h2>{{ userInfo.name }}</h2>
          <p class="dyh">
            学号：{{ userInfo.sid }}
            <span class="iconfont icon-erweima"></span>
          </p>
          <p class="jj">{{ userInfo.desc }}</p>
        </div>
        <!-- 用户标签 -->
        <div class="user-tag">
          <span>
            <span class="iconfont icon-touxiang" :style="userInfo.sex === '男' ? 'color: rgb(5, 224, 224);' : 'color: rgb(224, 93, 5);'"></span>
            {{ userInfo.age }}岁
          </span>
          <span>{{ userInfo.region }}</span>
          <span><span class="iconfont icon-jiahao1"></span>添加学校等标签</span>
        </div>
<!--        <div class="user-tag2">-->
<!--          <span><a>{{ userInfo.like }}</a>获赞</span>-->
<!--          <span><a>{{ userInfo.follow }}</a>关注</span>-->
<!--          <span><a>{{ userInfo.fans }}</a>粉丝</span>-->
<!--        </div>-->
      </div>
    </div>
    <!-- 内容切换 -->
<!--    <div class="mine-tab">-->
<!--      <div class="tab-navbar">-->
<!--        <div-->
<!--          class="item"-->
<!--          @click="changeTab(0)"-->
<!--          :class="indexTab === 0 ? 'active' : ''"-->
<!--        >-->
<!--          作品-->
<!--        </div>-->
<!--        <div-->
<!--          class="item"-->
<!--          @click="changeTab(1)"-->
<!--          :class="indexTab === 1 ? 'active' : ''"-->
<!--        >-->
<!--          私密<span class="iconfont icon-suo"></span>-->
<!--        </div>-->
<!--        <div-->
<!--          class="item"-->
<!--          @click="changeTab(2)"-->
<!--          :class="indexTab === 2 ? 'active' : ''"-->
<!--        >-->
<!--          喜欢<span class="iconfont icon-suo"></span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="tab-wrap" v-if="userInfo.vlist">-->
<!--        &lt;!&ndash; 作品 &ndash;&gt;-->
<!--        <div class="tab-con" v-show="indexTab === 0">-->
<!--          <div class="tab-con1" :v-if="userInfo.vlist.works.length === 0">-->
<!--            <h3>暂无作品</h3>-->
<!--          </div>-->
<!--          <div class="tab-img" :v-if="userInfo.vlist.works.length !== 0" v-for="i in userInfo.vlist.works" :key="i">-->
<!--            <img-->
<!--              src="@/assets/images/mine/bj.png"-->
<!--              style="width: 100%; height: auto"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; 私密 &ndash;&gt;-->
<!--        <div class="tab-con" v-show="indexTab === 1">-->
<!--          <div class="tab-con2" :v-if="userInfo.vlist.private.length === 0">-->
<!--            <h3>没有私密作品</h3>-->
<!--            <p>设为私密的作品和过期的日记会出现在这里，并且只有你能看到</p>-->
<!--          </div>-->
<!--          <div class="tab-img" v-for="i in userInfo.vlist.private" :key="i">-->
<!--            <img-->
<!--              src="@/assets/images/mine/bj2.png"-->
<!--              style="width: 100%; height: auto"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; 喜欢 &ndash;&gt;-->
<!--        <div class="tab-con" v-show="indexTab === 2">-->
<!--          <div class="tab-con1" :v-if="userInfo.vlist.likes.length === 0">-->
<!--            <h3>空空如也</h3>-->
<!--          </div>-->
<!--          <div>-->
<!--            <div class="tab-con3">只有你能看到自己的喜欢列表</div>-->
<!--            <div class="tab-img" :v-if="userInfo.vlist.likes.length !== 0" v-for="i in userInfo.vlist.likes" :key="i">-->
<!--              <img src="@/assets/images/mine/bj3.png" style="width: 100%; height: auto" />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      bgPic: {
        backgroundImage: `url(${require('@/assets/images/mine/bj.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      },
      indexTab: 0,
      works: [],
    };
  },
  created() {
    // 获取用户数据
    this.GetUserInfo();
  },
  // 计算属性，监控userInfo
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    ...mapActions('user', ['GetUserInfo']),
    changeTab(index) {
      this.indexTab = index;
    },
    gotoEdit() {
      this.$router.push({ name: 'edit' });
    },
    exitLogin() {
      localStorage.clear();
      this.$router.push('/sign');
    },
  },
};
</script>

<style lang="less" scoped>
.mine {
  .mine-top {
    height: 160px;
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    .menu-box {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-caidan {
        color: #ffffff;
        font-size: 20px;
      }
    }
  }
  .mine-wrap {
    position: relative;
    // top: 180px;
    width: 100%;
    background-color: #101821;
    color: #ffffff;
    .mine-content {
      padding: 0 15px;
      .info {
        position: relative;
        top: -25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-right {
          button {
            font-size: 17px;
            letter-spacing: 2px;
            height: 40px;
            width: 120px;
            padding: 0 2px;
            background-color: #393842;
            border: none;
            color: #ffffff;
            margin-left: 10px;
          }
        }
      }
      .desc {
        margin-top: -20px;
        h2 {
          font-size: 20px;
        }
        .dyh {
          font-size: 13px;
          height: 20px;
          line-height: 20px;
          padding: 5px 0 25px 0;
          color: rgb(163, 163, 163);
          .icon-erweima {
            font-size: 18px;
            font-weight: 600;
          }
        }
        .jj {
          font-size: 14px;
        }
      }
      .user-tag {
        height: 30px;
        margin-top: 0;
        font-size: 14px;
        color: #969696;
        span {
          margin-right: 5px;
          background: rgba(85, 85, 85, 0.6);
          padding: 5px 8px;
          .icon-touxiang {
            width: 10px;
            height: 10px;
            background-color: rgba(0, 0, 0, 0);
            margin: 0;
            padding: 0;
          }
          .icon-jiahao1 {
            background-color: rgba(0, 0, 0, 0);
            margin: 0;
            padding: 0;
          }
        }
      }
      .user-tag2 {
        padding: 15px 0;
        color: #9e9e9e;
        span {
          font-size: 16px;
          margin-right: 15px;
        }
        a {
          font-size: 18px;
          color: #ffffff;
          font-weight: 600;
          margin-right: 5px;
        }
      }
    }
  }
  .mine-tab {
    margin-top: -1px;
    height: 300px;
    width: 100%;
    background-color: #101821;
    .tab-navbar {
      padding-top: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        font-size: 16px;
        padding: 10px;
        flex: 1;
        text-align: center;
        color: #686868;
        .icon-suo {
          font-size: 14px;
          margin-left: 5px;
        }
      }
      .active {
        border-bottom: 2px solid #ffdf03;
        color: #ffffff;
        font-weight: 600;
      }
    }
    .tab-wrap {
      background-color: #101821;
      padding-top: 5px;
      .tab-con {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .tab-img {
          width: 33%;
          &:nth-child(3n) {
            border-right: 0;
          }
        }
        .tab-con1 {
          color: #a1a1a1;
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          h3 {
            color: #f3f3f3;
            font-size: 18px;
            font-weight: normal;
          }
        }
        .tab-con2 {
          color: #a1a1a1;
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          h3 {
            color: #f3f3f3;
            font-size: 18px;
            font-weight: normal;
          }
          p {
            margin-top: 0;
            font-size: 15px;
            text-align: center;
            line-height: 1.3;
          }
        }
        .tab-con3 {
          font-size: 14px;
          color: #a1a1a1;
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
