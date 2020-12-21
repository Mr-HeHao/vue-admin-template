import Vue from 'vue'
import Vuex from 'vuex'
import ro from "element-ui/src/locale/lang/ro";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tags: [
            {
                path: '/welcome',
                meta: {title: '首页'}
            }
        ],//访问过的页面集合

        cachedViewsData: [] // 缓存的集合
    },

    mutations: {
        ADD_TAG(state, router) {
            if (state.tags.some(v => v.path === router.path)) return;
            let index = state.tags.length;
            if (index > 8) {
                state.tags.splice(0, 1, router);
            } else {
                state.tags.splice(index > 0 ? index : 0, 0, router);
            }
        },

        CACHED_VIEWS_DATA(state, router) {
            if (state.cachedViewsData.includes(router.name)) return;
            let index = state.cachedViewsData.length;
            if (index > 8) {
                state.cachedViewsData.splice(0, 1, router.name);
            } else {
                state.cachedViewsData.push(router.name)
            }
        },

        DEl_TAGS: (state, router) => {
            for (const [ i, v ] of state.tags.entries()) {
                if (v.path === router.path) {
                    state.tags.splice(i, 1);
                    break
                }
            }
        },

        DEL_CACHED: (state, router) => {
            const index = state.cachedViewsData.indexOf(router.name);
            index > -1 && state.cachedViewsData.splice(index, 1)
        },

        ClEAR_TAGS: (state) => {
            state.tags.splice(1, state.tags.length);
        },

        CLEAR_ALL_CACHED: (state) => {
            state.cachedViewsData = [];
        },

        DEL_OTHERS_TAG: (state, router) => {
            state.tags = state.tags.filter(item => {
                return item.path === '/welcome' || router.path === item.path;
            });
        },

        DEL_OTHERS_CACHED: (state, router) => {
            const index = state.cachedViewsData.indexOf(router.name);
            if (index > -1) {
                state.cachedViewsData = state.cachedViewsData.slice(index, index +1);
            }else {
                state.cachedViewsData = [];
            }
        }
    },

    actions: {
        addTagNav({dispatch}, params) {
            dispatch('addTagsData', params);
            dispatch('cachedViewsData', params)
        },

        addTagsData({commit, state}, params) {
            commit('ADD_TAG', params)
        },

        cachedViewsData({commit, state}, params) {
            commit('CACHED_VIEWS_DATA', params)
        },

        delView({commit, state}, params) {
            return new Promise(resolve => {
                commit('DEl_TAGS', params);
                commit('DEL_CACHED', params);
                resolve({
                    tags: [ ...state.tags ],
                    cached: [ ...state.cachedViewsData ]
                })
            })
        },

        clearTags({commit, state}) {
            return new Promise(resolve => {
                commit('ClEAR_TAGS');
                commit('CLEAR_ALL_CACHED');
                resolve(state.tags)
            })
        },

        delOthersTag({commit, state}, params) {
            return new Promise(resolve => {
                commit('DEL_OTHERS_TAG', params);
                commit('DEL_OTHERS_CACHED', params);
                resolve(state.tags)
            })
        }
    }
})

export default store;
