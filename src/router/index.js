import Vue from 'vue'
import Router from 'vue-router'
import login from "../pages/login";
import mathematics from '../pages/mathematics';
import welcome from '../pages/welcome';
import literature from '../pages/literature';
import english from '../pages/english';


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
                    meta: {title: '首页'}
                },
                {
                    path: '/mathematics',
                    component: mathematics,
                    name: 'mathematics',
                    meta: {title: '菜单一'}
                },
                {
                    path: '/literature',
                    component: literature,
                    name: 'literature',
                    meta: {title: '语文'}
                },
                {
                    path: '/history',
                    component: literature,
                    name: 'literature',
                    meta: {title: '历史'}
                },
                {
                    path: '/english',
                    component: english,
                    name: english,
                    meta: {title: '英语'}
                },
            ]
        }
    ],

});


