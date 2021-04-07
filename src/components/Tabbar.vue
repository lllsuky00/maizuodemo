<template>
  <nav>
    <ul>
      <!--  tag="li" 会让routerlink标签变成li,active-class是个属性会动态的生成class   -->
      <router-link to="/film" tag="li" active-class="kerwinactive">
        <i class="iconfont icon-dianying"></i>
        <span>电影</span>
      </router-link>
      <router-link to="/cinema" tag="li" active-class="kerwinactive">
        <i class="iconfont icon-yingyuan"></i>
        <span>影院</span>
      </router-link>
      <router-link to="/center" tag="li" active-class="kerwinactive">
        <i class="iconfont icon-account"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
// 当此标签拥有scoped属性的时候，该组件下的css样式只适用于本组件，
//而不会影响全局组件。这其实也相当于样式的模块化了。
nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 25px;
  text-align: center;
  background: white;
  z-index: 999;
  ul {
    display: flex;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      i {
        font-size: 25px;
      }
      span {
        font-size: 100%;
      }
    }
  }
}
.kerwinactive {
  color: red;
}
</style>