<template>
    <div id="login">
        <header class="login-header">
            <h1>杭州衣科市场营销管理系统</h1>
        </header>
        <div id="panel">
            <div class="login-logo-box">
                <img src="../../static/images/slh.png" alt="../../static/images/login-logo.png">
            </div>
            <p class="login-name">
                市场营销管理后台
            </p>
            <div class="form">
                <div class="form-list">
                    <input type="text" name="username" placeholder="请输入账号">
                    <span><img src="../../static/images/zh.png" alt="../../static/images/zh.png"></span>
                </div>
                <div class="form-list">
                    <input type="password" name="password" placeholder="请输入密码">
                    <span><img src="../../static/images/mm.png" alt="../../static/images/mm.png"></span>
                </div>
                <div class="lose-psd">
                    <a href="javascript:;">忘记密码</a>
                </div>
                <button class="login-btn" @click="login" >登陆</button>
            </div>
        </div>
        <footer class="login-footer">
            <address>杭州衣科信息技术有限公司版权所有</address>
        </footer>
    </div>
</template>
<script>
    import router from '../router.js'
    export default {
        name: 'login',
        data () {
            return{
                username: 'zhang'
            }
        },
        methods: {
            login () {
                router.push('/home/testpanel');
            }
        }
    }
</script>
<style scoped>
    #login{
        font-family:SIL-Hei-Med-Jian;
        font-size: 14px;
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../../static/images/login-bg.png) no-repeat left top;
        background-size: 100% 100%;
    }
    #login .login-header{
        background-color: rgba(0,0,0, 0.2);
    }
    #login .login-header h1{
        /*background: url(../../static/images/logo.png) no-repeat left top;*/
        font-size: 0;
        width: 168px;
        height: 70px;
        margin: 0 0 0 30px;
    }
    #panel{
        width: 360px;
        height: 440px;
        padding: 33px 0 0 0;
        background-color: rgba(255,255,255,0.69);
        border-radius:20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .login-logo-box{
        width: 86px;
        height:86px;
        margin: 0 auto;
        text-align: center;
        font-size: 0;
        line-height: 86px;
    }
    .login-logo-box img{
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
    .login-name{
        margin: 11px 0 0 0;
        text-align: center;
        font-size:18px;
        color:#4083ab;
    }
    .form{
        width: 240px;
        height: 190px;
        margin: 37px auto 0;
    }
    .form .form-list{
        width: 240px;
        height: 40px;
        background:#ffffff;
        opacity: 1;
        margin: 0 0 10px 0;
        position: relative;
    }
    .form .form-list span{
        position: absolute;
        top: 8px;
        left: 12px;
    }
    .form .form-list input{
        text-indent: 53px;
        border: none;
        border:1px solid #dfdfdf;
        width: 100%;
        height: 100%;
        outline: none;
    }
    .form .form-list input:focus{
        border: 1px solid #87cbf4;
        border-left: 3px solid #4083ab;
    }
    .form .lose-psd{
        margin: 14px 0 32px 0;
        text-align: right;
    }
    .form .lose-psd a{
        color:#0f98ea;
    }
    .form .login-btn{
        border: none;
        cursor: pointer;
        background:#4083ab;;
        outline: none;
        width:240px;
        height:40px;
        font-size: 14px;
        color:#ffffff;
    }
    .form .login-btn:active{
        background-color: #85b3ce;
    }
    .login-footer{
        position: absolute;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
    }
    .login-footer address{
        color: #4a4a4a;
        font-style: normal;
    }
</style>