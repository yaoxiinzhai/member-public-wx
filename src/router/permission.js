import router, {
    routes
} from "./index"

router.beforeEach((to, from, next) => {
    // console.log(to)
    // console.log(from)
    console.log(router.getRoutes())
    next()
})