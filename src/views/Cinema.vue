<template>
  <div>
    <van-nav-bar
      title="影院"
      @click-left="onClickLeft()"
      @click-right="onClickRight()"
    >
      <template #right>
        <van-icon name="search" size="20" color="grey" />
      </template>
      <template #left>
        {{ cityName }}
        <van-icon name="arrow-down" size="18" color="grey" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{ height: height }">
      <ul>
        <li v-for="cinema in cinemaList" :key="cinema.cinemaId">
          <div>{{ cinema.name }}</div>
          <div class="address">{{ cinema.address }}</div>
          <div>￥{{ cinema.lowPrice / 100 }}起</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BetterScroll from "better-scroll";
import { mapMutations, mapState, mapActions } from "vuex";
import { NavBar, Icon } from "vant";
Vue.use(NavBar).use(Icon);
export default {
  data() {
    return {
      height: 0,
    };
  },
  computed: {
    ...mapState("CinemaModule", ["cinemaList"]),
    ...mapState("CityModule", ["cityId", "cityName"]),
  },
  methods: {
    ...mapMutations("CinemaModule", ["setCinemaList", "clearCinemaList"]),
    ...mapActions("CinemaModule", ["getCinemaList"]),

    //左边的图标定位到/city
    onClickLeft() {
      //清空$store.state.cinemaList,否则数据不会更新
      this.clearCinemaList();

      this.$router.push("/city");
    },
    //右边的定位到搜索
    onClickRight() {
      this.$router.push("/cinema/search");
      // console.log("search");
    },
  },
  mounted() {
    //访问cityid,cityname

    //获取可视窗口的高度
    this.height = document.documentElement.clientHeight - 100 + "px";

    //如果store里state.cinemaList为空数组
    if (this.cinemaList.length === 0) {
      //vuex异步流程
      this.getCinemaList(this.cityId).then(() => {
        //滚动条,异步的时候走一遍         状态立即更改,但是dom异步渲染
        this.$nextTick(() => {
          new BetterScroll(".cinema", {
            scrollbar: {
              fade: true,
            },
          });
        });
      });
    } else {
      console.log("缓存");
      //滚动条,走缓存的时候也走一遍
      this.$nextTick(() => {
        new BetterScroll(".cinema", {
          scrollbar: {
            fade: true,
          },
        });
      });
    }

    // this.cinemaList = res.data.data.cinemas;

    //     //滚动条
    //     //状态立即更改,但是dom异步渲染
    //     this.$nextTick(() => {
    //       new BetterScroll(".cinema", {
    //         scrollbar: {
    //           fade: true,
    //         },
    //       });
    //     });
  },
};
</script>
<style lang="scss" scoped>
li {
  padding: 5px;
  .address {
    font-size: 12px;
    color: grey;
  }
}
</style>
<style lang="scss" scoped>
.cinema {
  height: 300px;
  overflow: hidden;
  // 袖子滚动条的位置,这个相对定位可以让滚动条不会滚到下面的tabbar上
  position: relative;
}
</style>