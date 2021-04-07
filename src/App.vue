<template>
  <div id="app">
    {{ myname }}

    <tabbar v-show="isTabbarShow"></tabbar>
    <!-- 路由容器 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from "./components/Tabbar";
import { mapState } from "vuex";
export default {
  components: { tabbar },
  data() {
    return {
      myname: "otto",
    };
  },
  computed: {
    ...mapState("TabbarModule", ["isTabbarShow"]),
  },
  mounted() {
    //1.魅力惠-----后端配置已经好cors
    // axios.get('http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1616067779050&summary=9001a742bd0693023687cebd9f040b40&platform_code=H5')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //2.猫眼-----跨域,可以删掉前面的域名,然后在vue.config.js进行反向代理配置,再重启服务器
    // axios.get('https://m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=51A71C406A7B11EBAB1BC1F90D55E384F7AB530FFB6441848BD7CDE797BD535A&optimus_risk_level=71&optimus_code=10')
    //   axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=51A71C406A7B11EBAB1BC1F90D55E384F7AB530FFB6441848BD7CDE797BD535A&optimus_risk_level=71&optimus_code=10')
    //   .then(res => {
    //     console.log(res.data);
    //   })
    // }
    //3.卖座-----要传header
    // axios({
    //   url:
    //     "https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=3857893",
    //   headers: {
    //     "X-Client-Info":
    //       '{"a":"3000","ch":"1002","v":"5.0.4","e":"161381565233066953211905"}',
    //     "X-Host": "mall.film-ticket.film.list",
    //   },
    // }).then((res) => {
    //   console.log(res.data);
    // });
  },
};
</script>

<style lang="scss" sc>
li {
  list-style: none;
}
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
section {
  margin-bottom: 50px;
}
* {
  touch-action: manipulation;
}
</style>