<template>
	<el-container class="home-container">
		<!-- 侧边栏 -->
		<el-aside class="aside" :width="isCollapse?'64px':'200px'" style="overflow: hidden">
			<h1 class="aside-title" @click="skipHome">Logo</h1>
			<el-menu background-color="#304156"
					 text-color="#fff"
					 active-text-color="#409eff"
					 :collapse-transition="false"
					 router
					 @select="activeMenu($event)"
					 :default-active="$route.path"
					 :collapse="isCollapse">
				<template v-for="item in menuList">
					<el-menu-item :index="item.path" v-if="!item.children">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.label }}</span>
					</el-menu-item>
					<el-submenu :index="item.id" v-if="item.children">
						<!-- 一级菜单区域 -->
						<template slot="title">
							<!-- 图标 -->
							<i :class="item.icon"></i>
							<!-- 文本内容 -->
							<span slot="title">{{ item.label }}</span>
						</template>
						<!-- 二级菜单 -->
						<el-menu-item :index="subItem.path" v-for="(subItem, index) in item.children" :key="index">
							<!-- 二级菜单区域 -->
							<template slot="title">
								<!-- 文本内容 -->
								<span slot="title">{{ subItem.label }}</span>
							</template>
						</el-menu-item>
					</el-submenu>
				</template>

			</el-menu>

			<div class="collapse" @click="changeCollapse">
				<i class="el-icon-arrow-left" v-if="!isCollapse"></i>
				<i class="el-icon-arrow-right" v-else></i>
			</div>
		</el-aside>
		<el-container>
			<el-header class="home-header">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }" :replace="true">首页</el-breadcrumb-item>
					<template v-for="(item, i) in activeMenuLabel">
						<el-breadcrumb-item :key="i" v-if="activeMenuLabel.length == 1">
							{{ item.label }}
						</el-breadcrumb-item>
						<el-breadcrumb-item v-else :key="i" :to="{ path: item.isSkip ? '' + item.path : ''}"
											@click.native="activeMenu(item.path)">
							{{ item.label }}
						</el-breadcrumb-item>
					</template>
				</el-breadcrumb>

				<el-dropdown>
					<div class="user">
						<img src="../assets/images/a076538812dde74c0ebb42963653a002.jpg">
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</el-header>
			<!-- 内容 -->
			<el-main class="main">
				<tagsView @tagChange = 'activeMenu($route.path)'></tagsView>
				<div class="main-container">
					<keep-alive :include="cachedViewsData">
						<router-view></router-view>
					</keep-alive>
				</div>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import menuList from '../plugins/menu';
	import tagsView from '../components/tagsView'
	import { mapState } from "vuex";

	export default {
		name: "home",
		data() {
			return {
				isCollapse: false,
				menuList: menuList,
				activeMenuLabel: [],
			}
		},

		created() {
			this.activeMenu(this.$route.path);
			console.log(this.cachedViewsData)
		},

		computed: mapState([ 'cachedViewsData' ]),

		watch: {
			$route(to, from) {
				if (to.path == '/welcome') {
					this.activeMenuLabel = [];
				}
			}
		},

		components: {
			tagsView,
		},

		methods: {

			changeCollapse() {
				this.isCollapse = !this.isCollapse;
			},

			activeMenu(event) {
				this.activeMenuLabel = [];
				menuList.forEach(item => {
					if (item.hasOwnProperty('children')) {
						item.children.forEach(childrenItem => {
							if (childrenItem.path === event) {
								childrenItem.isSkip = false;
								item.isSkip = true;
								this.activeMenuLabel.push(item, childrenItem);
							}
						});
						return;
					}

					if (item.path === event) {
						this.activeMenuLabel.push(item);
					}
				});
			},

			skipHome() {
				this.$router.push('/welcome')
			},

			logout() {
				console.log('退出登录');
			}
		}
	}
</script>

<style scoped lang="less">
.home-container {
	height: 100%;

	.el-aside {
		background-color: #304156;
		position: relative;
	}

	.el-menu {
		border-right: none;
	}

	.aside-title {
		color: #ffffff;
		width: 180px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.home-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		padding: 0 15px;

		.user {
			img {
				width: 40px;
				height: 40px;
				border-radius: 10px;
			}
		}
	}

	.collapse {
		position: absolute;
		bottom: 0;
		height: 48px;
		width: 100%;
		z-index: 99;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		cursor: pointer;
		font-size: 20px;
	}

	.main {
		background-color: #f0f2f5;
		display: flex;
		flex-direction: column;

		.main-container {
			padding: 15px;
			height: 100%;
			display: flex;
			flex: 1;
			overflow-x: hidden;
		}
	}
}
</style>
