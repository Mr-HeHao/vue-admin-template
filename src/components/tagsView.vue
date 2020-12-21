<template>
    <div class="tags-nav">
        <div class="tags">
            <div class="tag"
                 v-for="tag in tags"
                 :class="isActive(tag)? 'tagActive': ''"
                 @click="skipPages(tag)"
            >
                <span>{{ tag.meta.title }}</span>
                <i class="el-icon-close" v-if="tag.path !== '/welcome'" @click.stop="closeSelectedTag(tag)"></i>
            </div>
        </div>

        <el-dropdown class="dropDown" trigger="click">
          <span class="el-dropdown-link">
            关闭操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="closeAllTags">关闭全部</el-dropdown-item>
                <el-dropdown-item @click.native="closeOthersTags">关闭其他</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "tagsView",
        data() {
            return {
            }
        },

        watch: {
            $route() {
                this.addTags();
            }
        },

        computed: {
            ...mapState(['tags'])
        },

        created() {
            // console.log(this.$route)
        },

        mounted() {
            this.addTags();
        },

        methods: {
            isActive(tag) {
                return tag.path === this.$route.path
            },

            closeSelectedTag(tag) {
                this.$store.dispatch('delView', tag).then((tags) => {
                    this.toLastView(tags, tag);
					this.$emit('tagChange')
                })
            },

            skipPages(tag) {
                this.$router.push(tag.path);
                this.$emit('tagChange')
            },

            closeAllTags() {
                this.$store.dispatch('clearTags').then(() => {
                    this.$nextTick(() => {
                        this.$router.replace({
                            path: '/welcome'
                        })
                    })
                })
            },

            closeOthersTags() {
                this.$store.dispatch('delOthersTag', this.$route)
            },

            toLastView(visitedView, data) {
                const latestView = visitedView.slice(-1)[0];
                if (latestView) {
                    this.$router.push(latestView.path);
                }
            },

            addTags() {
                if (this.$route.path) {
                    this.$store.dispatch('addTagNav', this.$route);
                }
            },
        }
    }
</script>

<style scoped lang="less">
.tags-nav {
    height: 30px;
    background: #ffffff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tags {
        display: flex;
        align-items: center;

        .tag {
            height: 26px;
            display: flex;
            align-items: center;
            background: #eeeeee;
            min-width: 80px;
            margin-right: 4px;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;

            &:hover {
                background: #42b983;
                color: #ffffff;
            }

            span {
                padding: 0 4px;
            }

            i:hover {
                background: #cccccc;
                border-radius: 50%;
            }
        }

        .tagActive {
            background: #42b983;
            color: #ffffff;
        }
    }

    .dropDown {
        background: #eeeeee;
        height: 30px;
        display: flex;
        align-items: center;
        padding: 0 4px;
        cursor: pointer;
    }
}
</style>
