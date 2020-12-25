<template>
    <div class="container">
        <el-card>
            <el-row :gutter="20">
                <el-col>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-upload2"
                               @click="importData"
                    >导入数据
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-download"
                               @click="fnExport"
                    >导出数据
                    </el-button>
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
    import { ImportData, Export } from '../plugins/utils'

    export default {
        name: "importData",
        data() {
            return {
                data: [ {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                } ],
                file: null,
                importClass: new ImportData(),
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
                        } else {
                            this.importClass.readFileData(this.file.files[0], (data) => {
                                if (!data.length) return;

                                const resultData = [];
                                data.forEach(item => { // 单个sheet数据处理
                                    if (Object.values(item).filter(_ => _)) {
                                        resultData.push(Object.values(item));
                                    }
                                })

                                this.setData(resultData)
                            });
                        }
                    }
                }
            },

            setData(dataArray) {
                const keys = [ 'address', 'date', 'name' ]; // 构造需要的字段
                dataArray.forEach(item => {
                    let obj = {};
                    for (const index in Object.values(item)) {
                        obj[keys[index]] = Object.values(item)[index];
                    }

                    this.data.push(obj)
                })
            },

            fnExport() { // 导出数据
                const e = new Export('导出文件名');
                let table = [];
                let header = [
                    { label: '日期', key: 'date' },
                    { label: '姓名', key: 'name' },
                    { label: '地址', key: 'address' }
                ];
                table.push(header.map(item => item.label)); // 构造表头

                this.data.forEach(item => { // 构造数据
                    let rowData = []
                    header.forEach(data => {
                        rowData.push(item[data.key]);
                    });
                    table.push(rowData)
                });

                const data = {
                    table: table,
                    title: '表格头部说明' // 可有可无
                }

                e.exportData(data)
            }
        }
    }
</script>

<style scoped>

</style>
