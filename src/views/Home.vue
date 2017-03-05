<template>
    <div id="home">
        <header class="home-header">
            <h2>欢迎登录市场营销管理后台！</h2>
        </header>
        <div class="home-main">

            <!--左侧tab切换开始-->
            <div class="home-main-left">
                <div class="slh-logo">
                    <img src="../../static/images/slh.png" alt="../../static/images/slh.png">
                </div>
                <p>商陆花</p>
                <ul>
                    <router-link tag="li" to="/home/testpanel">题卷列表</router-link>
                    <router-link tag="li" to="/home/activitylist">活动列表</router-link>
                </ul>
                <div class="home-setting">
                    <img src="../../static/images/sz.png" alt="../../static/images/sz.png">
                </div>
            </div>
            <!--左侧tab切换结束-->

            <!--右侧开始-->
            <div class="home-main-right">
                <router-view></router-view>
            </div>
            <!--右侧结束-->
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                
            };
        },
        components: {
        }
    };
</script>

<style>
    #home{
        width: 100%;
        height: 100%;
    }
    #home .home-header{
        background-color: #fff;
        box-shadow: 0 1px 7px 0;
    }
    #home .home-header h2{
        /*background: url(../../static/images/logo.png) no-repeat left top;*/
        height: 70px;
        margin: 0 0 0 30px;
        /*text-indent: 204px;*/
        line-height: 70px;
        font-size: 16px;
        color: #8c8c8c;
    }
    #home .home-main{
        position: absolute;
        width: 100%;
        top: 70px;
        bottom: 0;
    }
    #home .home-main-left{
        color: #fff;
        float: left;
        width: 190px;
        height: 100%;
        background: url('../../static/images/line.png') no-repeat center 162px #4083ab;
        padding: 30px 0 0 0;
        position: relative;
    }
    #home .router-link-active{
        background-color: #85b3ce !important;
    }
    #home .home-main-left .slh-logo{
        width: 90px;
        height: 90px;
        margin: 0 auto;
    }
    #home .home-main-left .slh-logo+p{
        margin: 9px 0 0 0;
        text-align: center;
        font-size: 12px;
    }
    #home .home-main-left ul{
        margin: 28px 0 0 0;
        font-size: 14px;
    }
    #home .home-main-left ul li{
        height: 67px;
        line-height: 67px;
        padding: 0 0 0 60px;
    }
    #home .home-main-left ul li:first-child{
        background: url('../../static/images/1.png') no-repeat 25px center;
    }
    #home .home-main-left ul li:nth-child(2){
        background: url('../../static/images/2.png') no-repeat 25px center;
    }
    #home .home-main-left .home-setting{
        position: absolute;
        left: 80px;
        bottom: 30px;
        width: 30px;
        height: 30px;
    }
    #home .home-main-right{
        float: left;
        margin: 20px 20px 0 20px;
        width: calc(100% - 230px);
        height: calc(100% - 20px);
    }
</style>