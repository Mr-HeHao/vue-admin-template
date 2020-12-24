<template>
    <div class="container">
        <el-card class="box-card">
            <el-row :gutter="20">
                <!--搜索框-->
                <el-col :span="6">
                    <el-input placeholder="请输入内容" size="small" clearable>
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <!--添加-->
                <el-col :span="4">
                    <el-button type="primary" size="small" @click="add" icon="el-icon-plus">添加</el-button>
                </el-col>
            </el-row>


            <el-table :data="tableData" style="width: 100%" border stripe>
                <el-table-column prop="date" label="日期">
                    <template slot-scope="scope">
                        {{ scope.row.date }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="remove">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>

        </el-card>
    </div>
</template>

<script>
export default {
    name: "tabel",

    data() {
        return {
            tableData: [ {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            } ]
        }
    },

    methods: {
        add() {

        },

        remove() {
          this.$confirm('确定要永久删除该数据?','提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
          }).then(res => {
              this.$notify.success('提示','删除成功');
          })
        }
    }
}
</script>

<style scoped lang="less">
.container {
    display: flex;
    flex: 1;
}

.form-search {
    display: flex;

    .search {
        width: 300px;
        margin-right: 10px;
    }

}
</style>
