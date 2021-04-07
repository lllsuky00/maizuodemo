import http from '@/util/http'
const module = {
    namespaced: true,

    state:{
        cinemaList: [],
    },
    mutations:{
        setCinemaList(state,cinemaList){
            state.cinemaList = cinemaList
          },
          clearCinemaList(state){
            state.cinemaList = []
          }
    },
    actions:{
        getCinemaList(store,cityId){
            //请求ajax
            return http({
                     url: `/gateway?cityId=${cityId}&ticketFlag=1&k=6896007`,
                     headers: {
                       "X-Host": "mall.film-ticket.cinema.list",
                     },
                   }).then((res) => {
                     // console.log(res.data);
                     store.commit('setCinemaList',res.data.data.cinemas)
                   });
       }
    }
}

export default module