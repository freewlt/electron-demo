import Vue from "vue";
import VueRouter from "vue-router";
// import { ipcRenderer } from "electron";


const Login = () => import("@/renderer/views/login").default;
const Home = () => import("@/renderer/views/Home").default;
const About = () => import("@/renderer/views/About");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
        meta: { title: "登录" },
    },
    {
        path: "/home",
        component: Home,
        meta: { title: "首页" },
    },
    {
        path: "/about",
        name: "About",
        component: About
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     let token;
//     if (sessionStorage.getItem("token")) {
//         token = JSON.parse(sessionStorage.getItem("token")).access_token;
//     }
//     if (to.path !== "/login" && !token) {
//         next({
//             path: "/login"
//         });
//     } else {
//         next();
//     }
// });

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

export default router;
