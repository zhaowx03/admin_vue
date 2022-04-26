import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: "/login"
    },
    {
        path: '/login',
        name: "login",
        component: () =>
            import ('../views/Login/login')
    },
    {
        path: '/home',
        name: "home",
        component: () =>
            import ('../views/home'),
        children: [
            // 用户列表
            {
                path: '/users',
                name: "users",
                component: () =>
                    import ('../views/users')
            },
            // 欢迎页面
            {
                path: '/welcome',
                name: "welcome",
                component: () =>
                    import ('../views/welcome')
            },
            // 角色列表
            {
                path: '/roles',
                name: "roles",
                component: () =>
                    import ('../views/roles')
            },
            // 权限列表
            {
                path: '/rights',
                name: "rights",
                component: () =>
                    import ('../views/rights')
            },
            // 商品列表
            {
                path: '/goods',
                name: "goods",
                component: () =>
                    import ('../views/goods')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to);
    //如果不是登录页面，在判断token值
    if (to.path != "/login") {
        //token值不存在的情况下
        if (!sessionStorage.getItem("token")) {
            next("/login"); //直接去登录页面即可
        }
    }
    next();
})

export default router