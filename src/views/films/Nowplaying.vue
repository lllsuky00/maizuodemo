<template>
  <div>
    正在热映的影片
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="item in datalist"
        :key="item.filmId"
        @click="handleclick(item.filmId)"
      >
        <img :src="item.poster" alt="" />
        <h3>{{ item.name }}</h3>
        <p
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
        >
          主演: {{ item.actors | actorFilter }}
        </p>
        <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { List, Cell } from "vant";
Vue.use(List).use(Cell);

import http from "@/util/http";
//过滤器,过滤item.actors数组,使其变为字符串
Vue.filter("actorFilter", (actors) => {
  //   console.log(actors);
  if (actors === undefined) return "暂无主演";
  return actors.map((item) => item.name).join(" ");
});

export default {
  data() {
    return {
      datalist: [],
      loading: false, //是否加载中,防止多次触发
      finished: false, //是否已经完成加载,
      current: 1, //记录当前页数
      total: 0,
    };
  },
  computed: {
    ...mapState("CityModule", ["cityId"]),
  },
  methods: {
    onLoad() {
      //为了防止一直请求.先进行一次判断
      // if (this.datalist的长度 === 数据总长度) {
      //   this.finished = true;
      //   return;
      // }
      if (this.datalist.length === this.total && this.datalist.length !== 0) {
        this.finished = true;
        return;
      }

      // console.log("到底了");

      //1.ajax请求新页面的数据
      //2.合并新数据到旧数据
      //3.this.loading = false

      //每当懒加载时,当前的页数+1
      this.current++;

      http({
        url: `/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=2958181`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        this.datalist = [...this.datalist, ...res.data.data.films];
        // this.datalist = this.datalist.concat(res.data.data.films);
        this.loading = false;
      });
    },
    handleclick(id) {
      //编程式导航,可以指定一个id,跳转到对应id的detail组件上
      //1.----路径
      // this.$router.push(`/detail/${id}`)
      //2.----路由名字
      // this.$router.push({
      //     name: 'kerwinDetail',    // => 指向的是name为kerwinDetail的路由
      //     params: {
      //         myid: id
      //     }
      // })
      //3.----query方式跳转详情
      this.$router.push(`/detail?id=${id}`);
    },
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=2958181`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
      // console.log(res.data);
    });
  },
};
// //声明式导航通过a链接跳转
// //编程式导航通过localtion.href跳转

//$router与$route的区别
//$router匹配的是router真个大对象
//$route匹配的当前路由对象信息
</script>

<style lang="scss" scoped>
.van-cell {
  overflow: hidden;
  padding: 10px;
  img {
    float: left;
    width: 100px;
  }
}
</style>