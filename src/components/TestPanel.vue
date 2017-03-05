<template>
    <div id="TestPanel">
        <ul class="tab">
            <router-link tag="li" to="/home/testpanel/list">题卷列表</router-link>
            <router-link tag="li" to="/home/testpanel/add">添加题卷</router-link>
        </ul>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    
</template>

<script>
    import router from '../router.js'
    export default{
        name: 'testPanel',
        mounted: function () {
            router.push('/home/testpanel/list');
        },
        data () {
            return {
                
            }
        }
    }
</script>

<style scoped>
    #TestPanel{
        height: 100%;
        width: 100%;
    }
    #TestPanel .router-link-active{
        background-color: #fff !important;
        color: #000 !important;
    }
    #TestPanel .tab{
        height: 34px;
    }
    #TestPanel .tab li{
        color: #fff;
        float: left;
        height: 100%;
        line-height: 34px;
        width: 110px;
        text-align: center;
        background-color: #9b9b9b;
    }
    #TestPanel .container{
        background-color: #fff;
        height: calc(100% - 34px);
        width: 100%;
        overflow: auto;
    }
</style>