// 所有信息
const getters = {
    getToKen(state){
        return state.user.toKen
    },
    getUserInfo(state){
        return state.user.userInfo
    },
    getAddRouters(state){
        return state.user.addRouters
    },
    prems: (state) => state.user.prems
}

export default getters