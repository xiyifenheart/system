<template>
    <div id="addtest">
        <div class="test-title">
            <label for="test-title">题卷名称:&nbsp;</label> <input v-model="paperData.paperName" type="text" id="test-title">
            <button class="save" @click="save">保存</button>
        </div>
        <div class="test-item-box">
            <!--题目开始-->
            <div class="test-item" v-for="(value, index) in paperData.itemList">
                <table>
                    <tr>
                        <td>
                            {{index + 1}}、添加题目:
                        </td>
                        <td colspan="2">
                            <textarea v-model="value.itemTitle"></textarea>
                        </td>
                        <td>
                            <button class="del" @click="delBtn(index, paperData.itemList)">删除</button>
                        </td>
                    </tr>
                    <tr class="h-40">
                        <td></td>
                        <td>正确答案：</td>
                        <td>
                            {{value.itemAnswer}}
                        </td>
                        <td></td>
                    </tr>
                    <tr class="h-40" v-for="(contentVal, contentIndex) in value.itemContent">
                        <td></td>
                        <td>选项{{contentIndex + 1}}：</td>
                        <td><input type="text" v-model="contentVal.op"></td>
                        <td><input type="radio" :value="contentVal.op" v-model="value.itemAnswer"></td>
                    </tr>
                    
                    <tr class="h-40">
                        <td></td>
                        <td></td>
                        <td><button @click="lessFunc(index)">减少选项</button><button @click="addFunc(index)">添加选项</button></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <!--题目结束-->
            <button class="addBtn" @click="addItem">添加题目</button>
        </div>
    </div>
</template>

<script>
    import router from '../router.js'
    export default{
        name: 'addtest',
        mounted: function () {
            /*
                如果是从题卷列表点击 修改 跳转过来的,this.$route.params就有数据,否则就是{}
            */
            if (!$.isEmptyObject(this.$route.params)) {
                var data = this.$route.params;
                for (var i = 0; i < data.itemList.length; i++){
                    console.log(data.itemList[i].itemContent);
                    data.itemList[i].itemContent = JSON.parse(data.itemList[i].itemContent);
                }
                console.log(data);
                this.paperData = data;
            }
        },
        methods: {
            //点击保存按钮
            save() {
                if ($('#addtest textarea').val().trim() == '' || $('#addtest input').val().trim() == ''){
                    alert('输入框内内容不能为空');
                    return;
                }
                var str = JSON.stringify(this.paperData);
                var data = JSON.parse(str);
                for (var i = 0; i < data.itemList.length; i++){
                    data.itemList[i].itemContent = JSON.stringify(data.itemList[i].itemContent);
                }
                $.ajax({
                    url: 'http://weixin.hzdlsoft.com/slh/api.do?apiKey=exam-paper-save',
                    type: 'get',
                    async: true,
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    jsonpCallback:"listFunc",
                    data: {
                        jsonParam : JSON.stringify(data)
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.code == 0) {
                            window.alert("保存成功");
                            router.push('/home/testpanel/list');
                        }
                        
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            },
            //添加题目
            addItem() {
                var str = JSON.stringify(this.itemData);
                var arr = JSON.parse(str);
                this.paperData.itemList.push(arr);
            },
            //删除题目
            delBtn(index, rows) {
                rows.splice(index, 1);
            },
            //减少项目
            lessFunc(index) {
                this.addLessFlag = 'less';
                this.addLessFunc(index)
            },
            //增加项目
            addFunc(index) {
                this.addLessFlag = 'add';
                this.addLessFunc(index);
            },
            addLessFunc(index) {
                var obj = this.paperData.itemList[index];
                
                if (obj.itemContent.length > 4 && this.addLessFlag == 'less') {
                    obj.itemContent.pop();
                    this.$set(obj, 'optionNum', obj.optionNum-=1);
                }else if(this.addLessFlag == 'add'){
                    obj.itemContent.push({"op": ""});
                    this.$set(obj, 'optionNum', obj.optionNum+=1);
                }
            }
        },
        data() {
            return{
                addLessFlag: '',
                paperData:  {
                    "paperId": "",
                    "paperName": "",
                    "itemList": [
                        {
                            "id": "",
                            "itemAnswer": "",
                            "itemContent": [{"op": ""},{"op": ""},{"op": ""},{"op": ""}],
                            "itemTitle": "",
                            "itemScore": 5,
                            "optionNum": 4,
                            "paperId": ''
                        }
                    ]
                },
                itemData: {
                    "id": "",
                    "itemAnswer": "",
                    "itemContent": [{"op": ""},{"op": ""},{"op": ""},{"op": ""}],
                    "itemTitle": "",
                    "itemScore": 5,
                    "optionNum": 4,
                    "paperId": ''
                }
            }
        }
    }
</script>

<style scoped>
    #addtest{
        max-width: 800px;
        height: 100%;
        font-size: 12px;
        color: #9b9b9b;
        border-right: 1px solid #eee; 
    }
    .test-title{
        height: 60px;
        line-height: 60px;
        text-indent: 27px;
        border-bottom: 1px solid #eee;
    }
    .test-title input{
        background:#f6f6f6;
        border:1px solid #c8c8c8;
        border-radius:2px;
        width:366px;
        height:26px;
    }
    .save{
        float: right;
        margin: 16px 19px 0 0;
        background:#4a90e2;
        border-color: #4a90e2;
        color: #fff;
        border-radius:2px;
        width:60px;
        height:28px;
    }
    .test-item-box{
        padding: 15px 0 0 37px;
        overflow: auto;
        height: calc(100% - 60px);
    }
    .test-item tr:first-child{
        height: 80px;
    }
    .test-item td:first-child{
        width: 90px;
    }
    .test-item td:last-child{
        width: 80px;
        text-align: center;
    }
    .test-item table textarea{
        width: 358px;
        height: 46px;
        border-color: #c8c8c8;
    }
    .test-item table textarea:focus{
        border-color: #51c6c6;
    }
    .test-item table td{
        vertical-align: middle;
    } 
    
    .h-40{
        height: 40px;
    }
    .h-40 input{
        height: 28px;
        width: 280px;
    }
    .h-40 td:nth-child(2){
        width: 78px;
    }
    .test-item button{
        background:#4a90e2;
        border-color: #4a90e2;
        color: #fff;
        border-radius:2px;
        width:120px;
        height:28px;
    }
    .test-item .del{
        background:#d9534f;
        border-color: #d43f3a;
        color: #fff;
        border-radius:4px;
        width:60px;
        height:28px;
    }
    .test-item button:last-child{
        float: right;
    }
    .addBtn{
        background:#4a90e2;
        border-radius:2px;
        border-color: #4a90e2;
        color: #fff;
        margin: 0 0 0 170px;
        width:280px;
        height:28px;
    }
</style>