// 布局的事件、样式、折叠动画等
const layout = {
    namespaced: true,
    state: {
        // 折叠
        hasCollapse: false,
        // 隐藏顶部导航栏
        hideTopNav: true,
        // 隐藏底部导航栏
        hideBotNav: false,
        // 当前路由
        nowRouter: {},
        docHeight: '',
        docWidth: '',
    },
    actions: {
        changeCollapse(context) {
            if (context.state.hasCollapse) {
                context.commit('set_collapse', false)
            } else {
                context.commit('set_collapse', true)
            }
        },
        // 当前路由
        changeRouter(context, router) {
            context.commit('set_router', router)
        },
        // 获取屏幕高宽
        getClientData(context) {
            // let docHeight = document.documentElement.clientHeight
            let docHeight = window.screen.height
            // let docWidth = document.documentElement.clientWidth
            let docWidth = window.screen.width
            console.log('宽：' + docWidth + ' ' + '高：' + docHeight)
            context.commit('set_clientData', docHeight, docWidth)
        }
    },
    mutations: {
        set_collapse(state, value) {
            state.hasCollapse = value
        },
        set_router(state, value) {
            state.router = value
        },
        set_clientData(state, docHeight, docWidth) {
            state.docHeight = docHeight
            state.docWidth = docWidth
        }
    }
}

export default layout