<template>
  <!-- 动态绑定class,避免轮播组件重名 -->
  <div class="swiper-container" :class="swiperclass">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.min.css";
export default {
  props: {
    //detail的组件传来的值
    perslide: {
      type: Number,
      default: 1,
    },
    swiperclass: {
      type: String,
      default: "swiper-container",
    },
  },
  mounted() {
    // console.log(this.perslide);
    new Swiper("." + this.swiperclass, {
      slidesPerView: this.perslide, //显示3个
      spaceBetween: 40, //间隔30px
      freeMode: true, //是freemode轮播
    });
  },
};
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  img {
    width: 100%;
  }
}
</style>