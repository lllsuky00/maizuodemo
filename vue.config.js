//关闭eslint,反向代理.......
module.exports = {
    devServer: {
        proxy:{
            '/ajax':{   //  /ajax开头的才匹配
                target:'https://m.maoyan.com', //导向域名
                changeOrigin:true  //改变域名
            },
            
        }
    }
}