<template>
  <div>
    <!--可以通过计算属性来获取存在的大写字母(数据里的type值)/也可以通过过滤器过滤出-->
    <!-- 计算属性定义起来像方法,用起来像属性 -->
    <van-index-bar :index-list="computedCityList" @select="handleSelect">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="(item, index) in data.list"
          :key="index"
          @click="handleChangePage(item.name, item.cityId)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell, Toast } from "vant";
import http from "@/util/http";
import { mapMutations } from "vuex";

Vue.use(IndexBar);
Vue.use(IndexAnchor).use(Cell);
export default {
  data() {
    return {
      // cityList: [
      //   {
      //     type: "A",
      //     list: ["A1", "A2", "A3"],
      //   },
      //   {
      //     type: "B",
      //     list: ["B1", "B2", "B3"],
      //   },
      //   {
      //     type: "C",
      //     list: ["C1", "C2", "C3"],
      //   },
      // ],
      cityList: [],
    };
  },

  // 计算属性定义起来像方法,用起来像属性
  computed: {
    computedCityList() {
      return this.cityList.map((item) => item.type);
    },
  },

  mounted() {
    //请求城市数据
    http({
      url: `/gateway?k=6570127`,
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      // 调用函数,并传入参数.把获取的数据改成希望的格式,然后赋值给空数组cityList
      this.cityList = this.handleCityData(res.data.data.cities);
    });
  },
  methods: {
    ...mapMutations("CityModule", ["changeCityName", "changeCityId"]),

    //传入请求的数据    输入原始数据,输出目标数据
    handleCityData(cities) {
      // cityList: [
      //     {
      //     type: "A",
      //     list: ["A1", "A2", "A3"],
      //     },
      // ],
      //   console.log(cities);

      //   创建空数组letterArr,用来储存转化后的大写字母A-Z
      const letterArr = [];
      //  用来储存处理后的城市的数据
      const newCities = [];
      //    循环asc码值,将对应的A-Z压入letterArr空数组中
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code));
      }

      //声明一个list数组
      letterArr.forEach((letter) => {
        //A走一遍,过滤出A开头的城市.然后BCD...按同样的步骤走一遍

        const list = cities.filter(
          //把传入的城市数据cities过滤,把城市按拼音的
          //首字母筛选出来,将等于对应字母letter的城市名,存入list数组中
          (item) => item.pinyin.substring(0, 1).toUpperCase() === letter
          //
        );

        // console.log(list);
        //如果遍历出来的城市(项)不为0(也就是不为 空数组----没有以这个字母开头的城市)
        //则把 目标格式对象 赋给newCities
        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list,
          });
        }
      });
      // console.log(newCities);

      //传出目标格式的值
      return newCities;
    },

    //点击右侧字母时,显示一个选中字母的框
    handleSelect(letter) {
      Toast(letter);
    },
    handleChangePage(name, cityId) {
      //cityid,cityname记录下来
      // this.$store.state.cityName = city; 公共资源不要随意修改

      this.changeCityName(name);
      this.changeCityId(cityId);
      this.$router.back();
    },
  },
};
</script>