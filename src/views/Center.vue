<template>
    <div>
        center
    </div>
</template>

<script>
//路由拦截
export default {
    //组件内的路由拦截
    beforeRouteEnter (to, from, next) {
        // ...
        if (!localStorage.getItem('token')) {
            next(`/login`)
            }else{
            next()
            }
    },
  

    mounted(){
        //组件加载完成(mounted)的时候,首先检查是否有token,如果没有,重定向到login
        // if (!localStorage.getItem('token')) {
        //     this.$router.push(`/login`)
        // }
    }
}
</script>