<template>
    <div class="container">
        <div class="login-container">
            <h3 class="title">系统登录</h3>

            <el-form :model="form" status-icon :rules="rules" ref="ruleForm" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "login",

    data() {
        return {
            form: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                ]
            }
        }
    },

    methods: {
        login() {
            this.$router.push('home');
        }
    }
}
</script>

<style scoped lang="less">
.container {
    background-color: #2d3a4b;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;

    .login-container {
        padding: 0 50px;
        width: 450px;
        margin: 0 auto;
        .title {
            margin-bottom: 40px;
            color: #fff;
            text-align: center;
            font-weight: 700;
            font-size: 26px;
        }

        .btns {
            margin-top: 20px;
        }
    }

    .login_form {
        bottom: 0;
        padding: 0 20px;
    }
}
</style>
