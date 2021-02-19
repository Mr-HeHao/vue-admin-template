<template>
	<div style="width: 100%;">
		<el-card style="display:flex;">
			<div id="main" style="width: 100%; height: 400px"></div>
		</el-card>

		<div class="pie">
			<el-card style="display:flex; flex: 1">
				<div id="pie" style="height: 390px"></div>
			</el-card>
			<el-card style="display:flex; flex: 2">
				<div id="pie1" style="width:100%; height: 390px"></div>
			</el-card>

		</div>


	</div>
</template>

<script>
	import * as echarts from "echarts";
	import '../plugins/dark'


	export default {
		name: "welcome",
		data() {
			return {
				category: [],
				dottedBase: +new Date(),
				lineData: [],
				barData: [],

				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							name: '直接访问',
							type: 'bar',
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '邮件营销',
							type: 'bar',
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'bar',
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '视频广告',
							type: 'bar',
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '搜索引擎',
							type: 'bar',
							data: [862, 1679, 964, 1026, 1679, 1600, 1570],
							markLine: {
								lineStyle: {
									type: 'dashed'
								},
								data: [
									[{type: 'min'}, {type: 'max'}]
								]
							}
						},
						{
							name: '百度',
							type: 'bar',
							barWidth: 5,
							stack: '搜索引擎',
							data: [620, 732, 701, 734, 1090, 1130, 1120]
						},
						{
							name: '谷歌',
							type: 'bar',
							stack: '搜索引擎',
							data: [120, 132, 101, 134, 290, 230, 220]
						},
						{
							name: '必应',
							type: 'bar',
							stack: '搜索引擎',
							data: [60, 72, 71, 74, 190, 130, 110]
						},
						{
							name: '其他',
							type: 'bar',
							stack: '搜索引擎',
							data: [62, 82, 91, 84, 109, 110, 120]
						},
                        // {
                        //     name:'折线',
                        //     type:'line',
                        //     itemStyle : {  /*设置折线颜色*/
                        //         normal : {
                        //             /* color:'#c4cddc'*/
                        //         }
                        //     },
                        //     data:[390, 230, 330, 410, 1679, 1130, 230, 130, 120]
                        // }
					]
				},
				pieOption: {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [
						{
							name: '访问来源',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [
								{value: 335, name: '直接访问'},
								{value: 310, name: '邮件营销'},
								{value: 234, name: '联盟广告'},
								{value: 135, name: '视频广告'},
								{value: 1548, name: '搜索引擎'}
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				},
				option1: {}
			}
		},

		created() {
			for (var i = 0; i < 20; i++) {
				var date = new Date(this.dottedBase += 3600 * 24 * 1000);
				this.category.push([
					date.getFullYear(),
					date.getMonth() + 1,
					date.getDate()
				].join('-'));
				var b = Math.random() * 200;
				var d = Math.random() * 200;
				this.barData.push(b)
				this.lineData.push(d + b);
			}
			this.option1 = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					data: [ 'line', 'bar' ],
					textStyle: {
						color: '#ccc'
					}
				},
				xAxis: {
					data: this.category,
					axisLine: {
						lineStyle: {
							color: '#ccc'
						}
					}
				},
				yAxis: {
					splitLine: {show: false},
					axisLine: {
						lineStyle: {
							color: '#ccc'
						}
					}
				},
				series: [ {
					name: 'line',
					type: 'line',
					smooth: true,
					showAllSymbol: true,
					symbol: 'emptyCircle',
					symbolSize: 15,
					data: this.lineData
				}, {
					name: 'bar',
					type: 'bar',
					barWidth: 10,
					itemStyle: {
						barBorderRadius: 5,
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#14c8d4'},
								{offset: 1, color: '#43eec6'}
							]
						)
					},
					data: this.barData
				}, {
					name: 'line',
					type: 'bar',
					barGap: '-100%',
					barWidth: 10,
					itemStyle: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: 'rgba(20,200,212,0.5)'},
								{offset: 0.2, color: 'rgba(20,200,212,0.2)'},
								{offset: 1, color: 'rgba(20,200,212,0)'}
							]
						)
					},
					z: -12,
					data: this.lineData
				}, {
					name: 'dotted',
					type: 'pictorialBar',
					symbol: 'rect',
					itemStyle: {
						color: '#0f375f'
					},
					symbolRepeat: true,
					symbolSize: [ 12, 4 ],
					symbolMargin: 1,
					z: -10,
					data: this.lineData
				} ]
			}
		},

		mounted() {
			var myChart = echarts.init(document.getElementById('main'),'dark');
			var pieChart = echarts.init(document.getElementById('pie'), 'dark');
			var pie1Chart = echarts.init(document.getElementById('pie1'), 'dark');
			myChart.setOption(this.option);
			pieChart.setOption(this.pieOption);
			pie1Chart.setOption(this.option1);
		}
	}
</script>

<style scoped lang="less">
.pie {
	display: flex;
	margin-top: 20px;

	.el-card {
		margin-right: 15px;
	}

	.el-card:nth-last-child {
		margin: 0;
	}
}
</style>
