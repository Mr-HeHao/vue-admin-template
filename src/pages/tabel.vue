<template>
    <div class="container">
        <el-card class="box-card">
            <el-row :gutter="20">
                <!--搜索框-->
                <el-col :span="6">
                    <el-input placeholder="请输入内容" size="small" clearable>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </el-col>
                <!--添加-->
                <el-col :span="4">
                    <el-button
                        type="primary"
                        size="small"
                        @click="add"
                        icon="el-icon-plus"
                        >添加</el-button
                    >
                </el-col>
            </el-row>

            <div class="table-main">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%"
                    border
                    stripe
                    @select="handleSelection"
                    @select-all="selectAll"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="date" label="日期">
                        <template slot-scope="scope">
                            {{ scope.row.date }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                    ></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="remove"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-pagination
                @current-change="handleCurrentChange"
                :page-size="4"
                background
                layout="prev, pager, next"
                :total="data.length"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "tabel",

    data() {
        return {
            tableData: [],
            data: [
                {
                    id: 1,
                    date: "2016-05-04",
                    name: "王小虎1",
                    address: "上海市普陀区金沙江路 1517 弄",
                    checked: false,
                },
                {
                    id: 2,
                    date: "2016-05-01",
                    name: "王小虎2",
                    address: "上海市普陀区金沙江路 1519 弄",
                    checked: false,
                },
                {
                    id: 3,
                    date: "2016-05-03",
                    name: "王小虎3",
                    address: "上海市普陀区金沙江路 1516 弄",
                    checked: false,
                },
                {
                    id: 4,
                    date: "2016-05-02",
                    name: "王小虎4",
                    address: "上海市普陀区金沙江路 1518 弄",
                    checked: false,
                },
                {
                    id: 5,
                    date: "2016-05-04",
                    name: "王小虎5",
                    address: "上海市普陀区金沙江路 1517 弄",
                    checked: false,
                },
                {
                    id: 6,
                    date: "2016-05-01",
                    name: "王小虎6",
                    address: "上海市普陀区金沙江路 1519 弄",
                    checked: false,
                },
                {
                    id: 7,
                    date: "2016-05-03",
                    name: "王小虎7",
                    address: "上海市普陀区金沙江路 1516 弄",
                    checked: false,
                },
                {
                    id: 8,
                    date: "2016-05-02",
                    name: "王小虎8",
                    address: "上海市普陀区金沙江路 1518 弄",
                    checked: false,
                },
                {
                    id: 9,
                    date: "2016-05-04",
                    name: "王小虎9",
                    address: "上海市普陀区金沙江路 1517 弄",
                    checked: false,
                },
                {
                    id: 10,
                    date: "2016-05-01",
                    name: "王小虎10",
                    address: "上海市普陀区金沙江路 1519 弄",
                    checked: false,
                },
                {
                    id: 11,
                    date: "2016-05-03",
                    name: "王小虎11",
                    address: "上海市普陀区金沙江路 1516 弄",
                    checked: false,
                },
                {
                    id: 12,
                    date: "2016-05-03",
                    name: "王小虎12",
                    address: "上海市普陀区金沙江路 1516 弄",
                    checked: false,
                },
            ],
            page: 1, // 页数
            checkedData: [], // 选中的数据
            allData: [], // 选择的条件
        };
    },

    mounted() {
        this.setTableData();
    },

    methods: {
        add() { },
        toggleSelection() { },

        setTableData(num = 1) {
            let start, end;
            if (num == 1) {
                start = 0;
                end = 4;
            } else if (num == 2) {
                start = 5;
                end = 9;
            } else {
                start = 9;
                end = 13;
            }
            this.tableData = this.data.slice(start, end);
        },

        /**
         * @description: 分页改变时的函数
         * @param {*} ev 当前页数
         */        
        handleCurrentChange(ev) {
            // 模拟请求数据
            this.setTableData(ev);
            // 清除勾选
            this.$refs.multipleTable.clearSelection();
            // 清空选中的数据
            this.checkedData = [];
            // 循环判断当前的数据
            this.tableData.forEach(item => {
                // 判断数据项是否在所有的数据里，没有则push
                if (this.allData.indexOf(item) == -1) {
                    this.allData.push(item)
                }
                // 判断当前数据是否在allData，并且是选中状态
                this.allData.forEach(_ => {
                    if ((item.id == _.id) && (_.checked)) {
                        this.checkedData.push(_)
                    }
                })

            });
            // 过滤重复的数据
            this.checkedData.forEach(row => {
                this.$nextTick(() => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            });
            console.log("选中的数据====>", this.checkedData);
        },

        /**
         * @description: 用户勾选函数
         * @param { Array } selection 所有勾选的数据
         * @param { Object } row 当前项数据
         */        
        handleSelection(selection, row) {
            this.tableData.forEach(item => {
                if (item.id == row.id) {
                    item.checked = !item.checked;
                }
            });
        },

        /**
         * @description: 用户全选函数
         * @param {*} selection 所有选中的数据
         */        
        selectAll(selection) {
            if (selection.length) {
                this.tableData.forEach(item => { item.checked = true });
            }
        },

        remove() {
            this.$confirm("确定要永久删除该数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then((res) => {
                this.$notify.success("提示", "删除成功");
            });
        },
    },
};
</script>

<style scoped lang="less">
.container {
    flex: 1;
    display: flex;
    overflow-y: auto;
}

.form-search {
    display: flex;

    .search {
        width: 300px;
        margin-right: 10px;
    }
}
</style>
