<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键字"
      @cancel="onCancel"
    />
    <van-list>
      <van-cell v-for="cinema in computedCinemaList" :key="cinema.cinemaId">
        <div>{{ cinema.name }}</div>
        <div class="address">{{ cinema.address }}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, List, Cell } from "vant";
import { mapState, mapActions } from "vuex";

Vue.use(Search).use(List).use(Cell);

export default {
  data() {
    return {
      value: "",
    };
  },
  computed: {
    ...mapState("CinemaModule", ["cinemaList"]),
    ...mapState("CityModule", ["cityId"]),
    computedCinemaList() {
      if (this.value === "") return [];

      //模糊查询,过滤器过滤掉大小写
      return this.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },

  methods: {
    ...mapActions("CinemaModule", ["getCinemaList"]),
    onSearch() {},
    onCancel() {
      //push适用于从列表到详情
      //back适用于返回
      //replace适用于替换之前的记录
      this.$router.replace("/cinema");
    },
  },
  mounted() {
    //防止用户在search页面刷新,加载不出数据.这个时候挂载的时候是空数组,
    if (this.cinemaList.length === 0) {
      //vuex异步流程
      this.getCinemaList(this.cityId);
      //   console.log(this.$store.state.cinemaList);
    } else {
      //   console.log("缓存");
    }
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