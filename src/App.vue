<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.el-card__body {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-y: auto;
    overflow: hidden;
}

.table-main {
    display: flex;
    overflow-y: auto;
}

.el-table {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
.el-table__body-wrapper {
    overflow-y: auto;
}

.el-table__footer-wrapper,
.el-table__header-wrapper {
    overflow: initial;
}
</style>
