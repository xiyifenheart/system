<template>
    <div id="activitylist">
        <div class="tab">
            <span>活动列表</span>
        </div>
        <div class="container">

            <div class="table">
                <!--
                    el-table
                    table组件 
                    data： 数据源
                    border:  是否带边框
                -->
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <!--
                        el-table-column
                        table的每一列
                        type: 
                            expand可扩展 
                            index显示该行引索(从1开始)
                    -->
                    <el-table-column align="center" type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="答题参与人数">
                                    <span>{{ props.row.accessNum }}</span>
                                </el-form-item>
                                <el-form-item label="查看答案人数">
                                    <span>{{ props.row.finishNum }}</span>
                                </el-form-item>
                                <el-form-item label="转发朋友圈数">
                                    <span>{{ props.row.shareNum }}</span>
                                </el-form-item>
                                <el-form-item label="试卷名称">
                                    <span>{{ props.row.ecCaption.paperId }}</span>
                                </el-form-item>
                                <el-form-item label="分享二维码">
                                    <span>
                                        <template>
                                            <Qrcode :qrcodeId="props.row.id"></Qrcode>
                                        </template>
                                    </span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                    type="index"
                    width="60"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="instName"
                    label="活动名称"
                    min-width="250"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    label="修改活动名称"
                    width="130"
                    align="center">
                        <template scope="scope">
                            <el-button
                            @click.native.prevent="changeRow(scope.$index, tableData)"
                            type="text"
                            size="small">
                            修改
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="createdDate"
                    label="开始时间"
                    width="220"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="updatedDate"
                    label="结束时间"
                    width="220"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="instStatus"
                    label="状态"
                    width="130"
                    align="center">
                    </el-table-column>
                </el-table>

            </div>
        </div>
        <!--
            遮罩层
        -->
        <div class="pubMsg" v-show="pubPanelFlag">
            <div class="pubPanel">
                <h3>发布活动 <span class="close" @click="pubPanelFlag=false">X</span></h3>
                <div class="center">
                    <label for="pubName">活动名称</label><input type="text" v-model="activityName" id="pubName" placeholder="请输入活动名称">
                </div> 
                <div class="pubBtn" @click="pubNameBtnClick"><button>确定</button></div>
            </div>
        </div>
    </div>
</template>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
<style scoped>
    .el-table{
        max-width: 1160px;
    }
    #activitylist{
        width: 100%;
        height: 100%;
    }
    #activitylist .tab{
        height: 34px;
    }
    #activitylist .tab span{
        color: #fff;
        display: block;
        height: 100%;
        line-height: 34px;
        width: 110px;
        text-align: center;
        background-color: #9b9b9b;
    }
    #activitylist .container{
        background-color: #fff;
        height: calc(100% - 34px);
        width: 100%;
        overflow: auto;
    }
    #activitylist .table{
        padding: 19px;
        width: 100%;
    }
    #activitylist .pubMsg{
        position: fixed;
        z-index: 3;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
    #activitylist .pubPanel{
        width: 440px;
        height: 130px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
    }
    #activitylist .pubPanel h3{
        font-size: 14px;
        text-indent: 20px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #a4a6a9;
        margin: 0 0 17px 0;
    }
    #activitylist .pubPanel h3 .close{
        float: right;
        margin: 0 10px 0 0;
        cursor: pointer;
    }
    #activitylist .pubPanel .center{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        text-indent: 22px;
    }
    #activitylist .pubPanel label{
        color: #8c8c8c;
        margin-right: 20px;
    }
    #activitylist .pubPanel .center input{
        height: 100%;
        width: 323px;
        
    }
    #activitylist .pubPanel .pubBtn{
        height: 56px;
        line-height: 56px;
        text-align: center;
    }
    #activitylist .pubPanel .pubBtn button{
        background:#4a90e2;
        border-radius:4px;
        border-color: #4a90e2;
        color: #fff;
        width:120px;
        height:28px;
    }
</style>

<script>
    import Qrcode from './Qrcode.vue'
    export default {
        name: 'activitylist',
        components: {
            Qrcode
        },
        mounted: function () {
            var _this = this;
            $.ajax({
                url: 'http://weixin.hzdlsoft.com/slh/api.do?apiKey=exam-inst-list&wrapper=true',
                type: 'get',
                async: true,
                dataType: 'jsonp',
                jsonp: 'jsonpCallback',
                jsonpCallback:"listFunc",
                success: function (res) {
                    console.log(res);
                    if (res.code == 0) {
                        _this.tableData = res.data.rows;
                    }
                    
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        methods: {
            changeRow(index, rows) {
                console.log(rows[index].id);
                this.activityId = rows[index].id;
                this.activityName = rows[index].instName;
                this.pubPanelFlag = true;
            },
            pubNameBtnClick(){
                var _this = this;
                $.ajax({
                    url: 'http://weixin.hzdlsoft.com/slh/api.do?apiKey=exam-inst-update',
                    type: 'get',
                    async: true,
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    jsonpCallback:"listFunc",
                    data: {
                        jsonParam: JSON.stringify({id: this.activityId,instName:this.activityName})
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.code == 0) {
                            alert("修改成功");
                            _this.pubPanelFlag = false;
                            window.location.reload();
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
            
        },
        data() {
            return {
                activityName: '',
                activityId: '',
                pubPanelFlag: false,
                tableData: []
            }
        }
    }
</script>