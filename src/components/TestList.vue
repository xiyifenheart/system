<template>
    <div id="testlist">
        <div class="table">
            <!--
                el-table
            -->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                 <el-table-column
                type="index"
                width="60"
                align="center">
                </el-table-column>
                <el-table-column
                prop="paperName"
                label="试题名称"
                min-width="250"
                align="center">
                </el-table-column>
                <el-table-column
                prop="updatedDate"
                label="最后修改时间"
                min-width="200"
                align="center">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="150"
                align="center">
                    <template scope="scope">
                        <el-button
                        @click.native.prevent="changeRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        修改
                        </el-button>
                        <el-button
                        @click.native.prevent="publicRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        发布
                        </el-button>
                        <!--<el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        删除
                        </el-button>-->
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!--
            遮罩层
        -->
        <div class="pubMsg" v-show="pubPanelFlag">
            <div class="pubPanel">
                <h3>发布活动 <span class="close" @click="pubPanelFlag=false">X</span></h3>
                <div class="center">
                    <label for="pubName">活动名称</label><input type="text" v-model="pubName" id="pubName" placeholder="请输入活动名称">
                </div> 
                <div class="pubBtn" @click="pubNameBtnClick"><button>发布</button></div>
            </div>
        </div>
    </div>
</template>

<script>
  import router from '../router.js'
  export default {
    name: 'testlist',
    data() {
      return {
        pubName: '',
        pubId: '',
        pubPanelFlag: false,
        httpFlag:'load',
        tableData: []
      }
    },
    mounted: function () {
        this.http('http://weixin.hzdlsoft.com/slh/api.do?apiKey=exam-paper-list');
    },
    methods: {
        http(url, data) {
            var _this = this;
            $.ajax({
                url: '' || url,
                type: 'get',
                async: true,
                dataType: 'jsonp',
                jsonp: 'jsonpCallback',
                jsonpCallback:"listFunc",
                data: '' || data,
                success: function (res) {
                    console.log(res);
                    if (res.code == 0) {

                        switch (_this.httpFlag) {
                            case 'load': _this.loadFunc(res.data.rows)
                                break;
                            case 'change': _this.changeFunc(res.data);
                                break;
                            case 'pub': {
                                alert("发布成功");
                                _this.pubPanelFlag = false;
                                router.push('/home/activitylist');
                            }
                                break;
                        }

                    }
                },
                error: function (err) {
                    console.log(err);
                }
            })
        },
        loadFunc(arr) {
            this.tableData = arr;
        },
        changeFunc(data) {
            console.log(data);
            router.push({name: 'addtest', params: data});

        },
        changeRow(index, rows) {
            this.httpFlag = 'change';
            var data = {paperId: rows[index].id};
            this.http('http://weixin.hzdlsoft.com/slh/api.do?apiKey=exam-paper-get-nocache', data);
        },
        publicRow(index, rows) {
            //pubPanelFlag true显示遮罩层 false隐藏遮罩层
            this.pubPanelFlag = true;
            this.pubId = rows[index].id;
        },
        pubNameBtnClick(){
            this.httpFlag = 'pub';
            this.http('http://weixin.hzdlsoft.com/slh/api.do?apiKey=exam-inst-create',
                {jsonParam:
                    JSON.stringify({instName: this.pubName,paperId:this.pubId})
                })
        },
        deleteRow(index, rows) {
            // rows.splice(index, 1);
            console.log(index);
        }
    }
  }
</script>

<style scoped>
    .el-table{
        max-width: 892px;
    }
    #testlist .table{
        padding: 19px;
        width: 100%;
    }
    #testlist .pubMsg{
        position: fixed;
        z-index: 3;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
    #testlist .pubPanel{
        width: 440px;
        height: 130px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
    }
    #testlist .pubPanel h3{
        font-size: 14px;
        text-indent: 20px;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #a4a6a9;
        margin: 0 0 17px 0;
    }
    #testlist .pubPanel h3 .close{
        float: right;
        margin: 0 10px 0 0;
        cursor: pointer;
    }
    #testlist .pubPanel .center{
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        text-indent: 22px;
    }
    #testlist .pubPanel label{
        color: #8c8c8c;
        margin-right: 20px;
    }
    #testlist .pubPanel .center input{
        height: 100%;
        width: 323px;
        
    }
    #testlist .pubPanel .pubBtn{
        height: 56px;
        line-height: 56px;
        text-align: center;
    }
    #testlist .pubPanel .pubBtn button{
        background:#4a90e2;
        border-radius:4px;
        border-color: #4a90e2;
        color: #fff;
        width:120px;
        height:28px;
    }
</style>
