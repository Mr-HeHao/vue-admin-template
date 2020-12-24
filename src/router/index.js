import Vue from 'vue'
import Router from 'vue-router'
import login from "../pages/login";
import tabel from '../pages/tabel';
import welcome from '../pages/welcome';
import importData from '../pages/importData';


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: login},
        {
            path: '/home',
            component: () => import('@/pages/home'),
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: welcome,
                    meta: {title: 'home'}
                },
                {
                    path: '/tabel',
                    component: tabel,
                    name: 'tabel',
                    meta: {title: 'tabel'}
                },
                {
                    path: '/importData',
                    component: importData,
                    name: 'importData',
                    meta: {title: 'importData'}
                },

            ]
        }
    ],

});


