<template>
  <div>
    <!-- 最顶部的轮播组件 -->
    <film-swiper>
      <div class="swiper-slide" v-for="(item, index) in imgList" :key="index">
        <div
          :style="{ backgroundImage: 'url(' + item + ')' }"
          style="height: 200px; background-size: cover"
        ></div>
      </div>
    </film-swiper>

    <!-- 正在热映和即将上映选项的路由,下拉会停留在界面最上方 -->
    <film-header
      style="position: sticky; top: 0px; background: white"
    ></film-header>

    <!-- films里文件夹文件的路由容器 -->
    <router-view></router-view>

    <!-- czy负责开发 -->
  </div>
</template>

<script>
import FilmHeader from "./films/FilmHeader";
import FilmSwiper from "./films/FilmSwiper";
export default {
  data() {
    return {
      imgList: [
        "https://pic.maizuo.com/usr/movie/947906c4689a464364b5d96e977de6d2.jpg?x-oss-process=image/quality,Q_70",
        "https://pic.maizuo.com/usr/movie/10782373401f67672232667066c5278e.jpg?x-oss-process=image/quality,Q_70",
        "https://pic.maizuo.com/usr/movie/962152780002ba0925aabe6bed25576f.jpg?x-oss-process=image/quality,Q_70",
      ],
    };
  },
  components: {
    FilmHeader,
    FilmSwiper,
  },
};
</script>

<style lang="scss">
#nav {
  display: flex;
  li {
    flex: 1;
  }
}
</style>