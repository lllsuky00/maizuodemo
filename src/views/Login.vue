<template>
  <div>
    <h1>Login!</h1>
    请输入账号密码
    <input type="text" />
    <button>登陆</button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);
export default {};
</script>