<template>
  <div class="video-list">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in dataList" :key="index">
        <div class="video-item">
          <Videos ref="videos" :video="item" :index="index"></Videos>
        </div>
        <div class="info-bar">
<!--          <InfoBar-->
<!--            :infoName="item.perName"-->
<!--            :infoDesc="item.perDesc"-->
<!--            :infoMusic="item.perMusicName"-->
<!--          ></InfoBar>-->
        </div>
        <div class="right-bar">
          <RightBar
            :perPicture="item.perPicture"
            :perLikes="item.perLikes"
            :perComments="item.perComments"
            :perForward="item.perForward"
            :videoUrl = "item.url"
            :likeList = "likeList"
            :videoIndex = "index"
            @changeCom="showOrClose"
          ></RightBar>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 评论列表 -->
<!--    <transition name="up">-->
<!--      <div class="comment-wrap" v-if="showComment">-->
<!--        <div class="comment-list">-->
<!--          <div class="comment-top">-->
<!--            <div class="number">15条评论</div>-->
<!--            <div class="close" @click="showOrClose">-->
<!--              <span class="iconfont icon-guanbi"></span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="comment-body">-->
<!--            <div class="comment-box" v-for="i in 20" :key="i">-->
<!--              <div class="comment-item">-->
<!--                <img class="user-pic" src="@/assets/images/author.png" alt="" />-->
<!--                <div class="item-info">-->
<!--                  <div class="replay">-->
<!--                    <p class="name">八戒</p>-->
<!--                    <p class="replay-desc">-->
<!--                      程序员不加班不加班不加班不加班不加班不加班不加班不加班-->
<!--                    </p>-->
<!--                    <p class="time">-->
<!--                      03-20-->
<!--                      <span class="huifu">回复</span>-->
<!--                    </p>-->
<!--                  </div>-->
<!--                  <div class="zan">-->
<!--                    <span class="iconfont icon-aixin">-->
<!--                      <p>10</p>-->
<!--                    </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="sub-comment-item">-->
<!--                <img class="user-pic" src="@/assets/images/author.png" alt="" />-->
<!--                <div class="item-info">-->
<!--                  <div class="replay">-->
<!--                    <p class="name">悟空</p>-->
<!--                    <p class="reply-name">不加班不加班</p>-->
<!--                    <p class="time">-->
<!--                      03-19-->
<!--                      <span class="huifu">回复</span>-->
<!--                    </p>-->
<!--                  </div>-->
<!--                  <div class="zan">-->
<!--                    <span class="iconfont icon-aixin">-->
<!--                      <p>20</p>-->
<!--                    </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="more">-->
<!--                —— 展开60条回复-->
<!--                <span class="iconfont icon-xiajiantou"></span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash; 输入评论 &ndash;&gt;-->
<!--          <div class="reply-input">-->
<!--            <input type="text" placeholder="留下你的精彩评论吧" />-->
<!--            <div class="input-right">-->
<!--              <span class="iconfont icon-aite"></span>-->
<!--              <span class="iconfont icon-biaoqing"></span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition>-->
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
  import 'swiper/swiper.min.css';
  import Videos from './Videos.vue';
  import InfoBar from '../index/InfoBar.vue';
  import RightBar from '../index/RightBar.vue';
  import { GET, POST } from '../../../request/http';

  export default {
    components: {
      Swiper,
      SwiperSlide,
      Videos,
      // InfoBar,
      RightBar,
    },
    directives: {
      swiper: directive,
    },
    data() {
      return {
        // 显示评论列表
        showComment: false,
        swiperOptions: {
          // 分页器配置
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          // 设定初始化时slide的索引
          initialSlide: 0,
          // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
          direction: 'vertical',
          // 鼠标覆盖Swiper时指针形状，设置为true时会变成抓手形状
          grabCursor: true,
          // Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，
          // 在对flexbox布局的支持不是很好的浏览器中可能需要用到。
          setWrapperSize: true,
          // 自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
          autoHeight: true,
          // 设置slider容器能够同时显示的slides数量(carousel模式)。
          slidesPerView: 1,
          // 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
          mousewheel: true,
          // 是否开启鼠标控制Swiper切换。设置为true时，能使用鼠标滑轮控制slide滑动。
          mousewheelControl: true,
          // 获取swiper容器的高度。
          height: window.innerHeight, // 因为抖音视频的高度是占满整个屏幕的高度
          // 抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。
          resistanceRatio: 0,
          // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
          observeParents: true,
          // swiper组件提供的方法
          on: {
            tap: () => {
              // this.isTrigger = true;
              this.playAction(this.page - 1);
            },
            // 上滑 当屏幕向上滑动时
            slidePrevTransitionStart: () => {
              if (this.page > 1) {
                if(localStorage.getItem('sid') !== null){
                  this.saveVideoTime(this.page - 1);
                }
                this.$refs.videos[this.page - 1].setCount()
                this.page -= 1;
                this.preVideo(this.page - 1);
                // console.log('shanghua');
              }
            },
            // 下滑动 当屏幕向下滑动时
            slideNextTransitionStart: () => {
              if(localStorage.getItem('sid') !== null){
                this.saveVideoTime(this.page - 1);
              }
              this.$refs.videos[this.page - 1].setCount()
              this.page += 1;
              this.nextVideo(this.page - 1);
              // console.log('xiahua');
            },
          },
        },
        dataList: [],
        likeList: [],
        videoUrl: [],
        // 标识翻页
        page: 1,
      };
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
    },
    created() {
      GET('/video')
        .then(async (res) => {
          this.dataList = res.data.list;
          // eslint-disable-next-line no-plusplus
          // for (let i = 0; i < this.dataList.length; i++) {
          //   this.videoUrl.push(this.dataList[i].url);
          // }
          if (localStorage.getItem('sid') != null) {
            const current = localStorage.getItem('sid');
            const users = await GET('/admin/userList');
            const userdata = users.data.userInfo;
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < userdata.length; i++) {
              if (current === userdata[i].sid) {
                this.likeList = userdata[i].history.liked;
                // console.log(this.likeList);
                break;
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    methods: {
      playAction(index) {
        // index 当前屏幕上显示的视频是第几个视频
        // 调用videos组件的playOrStop 方法
        this.$refs.videos[index].playOrStop();
      },
      // 用户下拉时暂停当前正在播放的视频并自动播放上一个视频
      preVideo(index) {
        this.$refs.videos[index].play();
        this.$refs.videos[index + 1].stop();
      },
      // 用户上滑时暂停当前正在播放的视频并自动播放下一个视频
      nextVideo(index) {
        this.$refs.videos[index].play();
        this.$refs.videos[index - 1].stop();
      },
      // 弹出或关闭评论列表
      showOrClose() {
        this.showComment = !this.showComment;
      },
      saveVideoTime(page) {
        const time = this.$refs.videos[page].getPlayerTime();
        const count = this.$refs.videos[page].getCount();
        POST('/video/recordTime', {url: this.dataList[page].url, time: time,count: count, user: localStorage.getItem('sid')})
        // console.log(page, time);
      },
    },
  };
</script>

<style lang="less" scoped>
.video-list {
  height: 100%;
  .swiper-container {
    height: 100%;
    display: flex;
    background-color: #000;
    color: #fff;
    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .video-item {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .info-bar {
        width: 100%;
        position: absolute;
        bottom: 30px;
        left: 0;
      }
      .right-bar {
        width: 70px;
        position: absolute;
        right: 5px;
        top: 40%;
        z-index: 99;
      }
    }
  }
  .comment-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 500px;
    width: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    z-index: 999;
    padding: 15px;
    background-color: #F8F8FF;
    box-sizing: border-box;
    .comment-top {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 13px;
      margin-top: 10px;
      margin-bottom: 15px;
      .number {
        flex: 1;
        text-align: center;
      }
      .close {
        position: absolute;
        right: 14px;
        top: 14px;
        color: #777;
        .icon-guanbi {
          font-size: 26px !important;
        }
      }
    }
    .comment-body {
      max-height: 400px;
      overflow: auto;
      .comment-box {
        padding-bottom: 20px;
        .comment-item,.sub-comment-item{
          display: flex;
          margin-top: 10px;
          .user-pic {
            width: 33px;
            height: 33px;
            border-radius: 50%;
          }
          .item-info {
            margin-left: 10px;
            display: flex;
            flex: 1 auto;
            .replay {
              width: 90%;
              .name {
                color: #686868;
                font-size: 13px;
              }
              .replay-desc {
                padding: 5px;
                font-size: 14px;
                line-height: 20px;
              }
              .time {
                color: #bbbbbb;
                .huifu {
                  color: #686868;
                  font-size: 13px;
                  margin-left: 15px;
                  font-weight: 600;
                }
              }
            }
            .zan {
              color: rgb(182, 181, 181);
              display: flex;
              margin-top: 10px;
              margin-left: 33px;
              .icon-aixin {
                font-size: 24px;
                text-align: center;
              }
              p {
                margin-top: 0;
                font-size: 15px;
              }
            }
          }
        }
        .more {
          margin-left: 45px;
          color: rgb(177, 177, 177);
        }
      }
    }
    .reply-input {
      width: 100%;
      height: 50px;
      border-top: 1px solid #d9d9d9;
      position: absolute;
      bottom: 0;
      left: 0;
      align-items: center;
      display: flex;
      background-color: #fff;
      padding: 0 15px;
      input {
        line-height: 40px;
        width: 70%;
        padding: 0 15px;
        box-sizing: border-box;
        border: none;
        background-color: #e6e6e6;
        border-radius: 20px;
      }
      .input-right {
        padding-right: 15px;
        flex: 1;
        display: flex;
        justify-content: space-evenly;
        .iconfont {
          font-size: 30px;
          color: #999999;
        }
      }
    }
  }

  /* 评论里列表弹出动画 */
  .up-enter-active, .up-leave-active {
    transition: all .5s;
  }
  .up-enter, .up-leave-to {
    opacity: 1;
    transform: translateY(100%);
  }
}
</style>
