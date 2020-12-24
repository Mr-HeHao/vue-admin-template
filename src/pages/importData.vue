<template>
	<div class="container">
		<el-card>
			<el-row :gutter="20">
				<el-col>
					<el-button type="primary"
							   size="small"
							   icon="el-icon-upload2"
							   @click="importData"
					>导入数据</el-button>
					<el-button type="primary"
							   size="small"
							   icon="el-icon-upload2"
							   @click="fnExport"
					>导出数据</el-button>
				</el-col>
			</el-row>
			<el-table :data="data" style="width: 100%" border stripe>
				<el-table-column prop="date" label="日期"></el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import xlsx from 'xlsx'
	export default {
		name: "importData",
		data() {
			return {
				data: [ {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				file: null
			}
		},

		methods: {
			importData() {
				this.file = document.createElement('input');
				this.file.type = 'file';
				this.file.click();

				this.file.onchange = () => {
					if (this.file.files.length) {
						let fileName = this.file.files[0].name;
						let temp = fileName.split('.');
						let suffix = temp[temp.length - 1].toUpperCase();

						if (suffix !== 'XLSX' && suffix !== 'XLS') {
							this.$notify.success('提示信息', '请选择文件扩展名为xlsx的文件');
						}else {
							this.readFileData(suffix);
						}
					}
				}
			},

			readFileData(suffix) {
				let fileReader = new FileReader();
				fileReader.readAsBinaryString(this.file.files[0]); // 读取文件内容
				fileReader.onload = (ev) => { // 读取完毕拿到编码数据
					this.doXlsx(ev.target['result']);
				};
			},

			doXlsx(data) {
				let workBook = xlsx.read(data, { type: 'binary' });
				let origin = [];
				let origins = [];
				let dataArray = [];

				if (workBook.SheetNames.length === 1) { // 一个页签sheet
					origin = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);
				}else { // 如果是多个页签sheet
					workBook.SheetNames.forEach((item, i) => {
						origins['data' +i] = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[i]])
					})
				}

				if (!origin.length) return;
				console.log(origin)
				origin.forEach(item => {
					console.log(Object.keys(item))
					if (Object.values(item).filter(_ => _)) {
						dataArray.push(Object.values(item));
					}
				})

				this.setData(dataArray)
			},

			setData(dataArray) {
				const keys = ['address', 'date', 'name']; // 构造需要的字段
				dataArray.forEach(item => {
					let obj = {};
					for (const index in Object.values(item)) {
						obj[keys[index]] = Object.values(item)[index];
					}
					this.data.push(obj)
				})
			},

			fnExport() {
				const ws = xlsx.utils.json_to_sheet(this.data);
				// 新建book
				const wb = xlsx.utils.book_new()
				// 生成xlsx文件(book,sheet数据,sheet命名)
				xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
				// 写文件(book,xlsx文件名称)
				xlsx.writeFile(wb, '列表详情.xlsx')
			}
		}
	}
</script>

<style scoped>

</style>
