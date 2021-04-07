<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper/bundle"; //引入swiper.js
import "swiper/swiper-bundle.min.css"; //引入css
export default {
  mounted() {
    new Swiper(".swiper-container", {
      //分页器
      pagination: {
        el: ".swiper-pagination",
      },
      //循环
      loop: true,
    });
  },
};
</script>

<style lang="scss" scoped>
</style>