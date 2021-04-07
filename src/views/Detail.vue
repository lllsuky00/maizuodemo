<template>
  <div v-if="filmInfo">
    <!-- <v-touch @swipeleft="onSwipeLeft">Swipe me!</v-touch> -->
    <!-- 顶部的提示栏,用自定义属性v-top获取节点 -->
    <detail-header v-top="" :title="filmInfo.name"> </detail-header>
    <!-- 顶部的海报 -->
    <div
      :style="{ backgroundImage: 'url(' + filmInfo.poster + ')' }"
      style="height: 200px; background-size: cover; background-position: center"
    ></div>

    <!-- 相关信息 -->
    <h3>{{ filmInfo.name }}--{{ filmInfo.filmType.name }}</h3>
    <div>{{ filmInfo.category }}</div>
    <div>{{ filmInfo.premiereAt | dateFilter }}上映</div>
    <div>{{ filmInfo.nation }}|{{ filmInfo.runtime }}分钟</div>

    <!-- 是否隐藏电影简介 -->
    <div :class="isshow ? '' : 'synopsis'">{{ filmInfo.synopsis }}</div>

    <!-- 隐藏/显示箭头,点击可以显示电影简介--------点击事件动态控制class改变箭头样式(方向) -->
    <div style="text-align: center">
      <i
        class="iconfont"
        :class="isshow ? 'icon-arrow-up' : 'icon-arrow-down'"
        @click="isshow = !isshow"
      ></i>
    </div>

    <h3>演职人员</h3>
    <detail-swiper :perslide="3" swiperclass="swiper-actors">
      <div
        class="swiper-slide"
        v-for="(item, index) in filmInfo.actors"
        :key="index"
      >
        <img :src="item.avatarAddress" alt="" />
        <div style="text-align: center">
          <div>{{ item.name }}</div>
          <div>{{ item.role }}</div>
        </div>
      </div>
    </detail-swiper>

    <h3>剧照</h3>

    <detail-swiper :perslide="2" swiperclass="swiper-photos">
      <!-- 创建一个自定义属性,避免轮播组件重名 -->
      <div
        class="swiper-slide"
        v-for="(item, index) in filmInfo.photos"
        :key="index"
      >
        <div
          :style="{ backgroundImage: 'url(' + item + ')' }"
          style="
            height: 100px;
            background-size: cover;
            background-position: center;
          "
          @click="handlePreview(index)"
        ></div>
      </div>
    </detail-swiper>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import DetailHeader from "./films/DetailHeader";
import DetailSwiper from "./films/DetailSwiper";
import Vue from "vue";
import moment from "moment";
import { mapMutations } from "vuex";
import http from "@/util/http"; //别名@ ==> src的绝对路径
// var VueTouch = require("vue-touch");
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });

//过滤器
Vue.filter("dateFilter", (date) => {
  //专门处理时间的库--moment
  return moment(date * 1000).format("YYYY-MM-DD");
});

//自定义指令,获取节点,并对其进行操作
Vue.directive("top", {
  inserted(el) {
    // console.log(el);
    el.style.display = "none";
    window.onscroll = () => {
      // console.log("11111");
      //如果顶部的提示栏移动>0  则显示,否则不显示
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 0) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  //自定义指令记得解绑
  unbind() {
    window.onscroll = null;
  },
});

export default {
  data() {
    return {
      filmInfo: null,
      isshow: false,
    };
  },

  methods: {
    ...mapMutations("TabbarModule", ["hide", "show"]),
    handlePreview(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
      });
    },
    onSwipeLeft() {
      console.log("11111");
    },
  },
  components: {
    DetailSwiper,
    DetailHeader,
  },
  mounted() {
    // console.log('利用获取的id,ajax请求后端接口',this.$route.params.myid); //这是通过动态路由获取的
    //$router匹配的是router真个大对象
    //$route匹配的当前路由对象信息
    // console.log("利用获取的id,ajax请求后端接口", this.$route.query.id);

    //调用封装好axios的函数,并传参
    http({
      url: `/gateway?filmId=${this.$route.query.id}&k=583975`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      // console.log(res.data.data.film);
      this.filmInfo = res.data.data.film;
    });

    //隐藏tabbar
    this.hide();
  },
  beforeDestroy() {
    this.show();
  },
};
</script>

<style lang="scss" scoped>
.synopsis {
  height: 50px;
  overflow: hidden;
}
</style>