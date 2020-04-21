//批量导入
<template>
    <div class="bg-b">   
        <div class="ocontent import ">
            <p class="title clearfix bor-b">
                <span class="line"></span>
                <span>批量导入</span>
                <span class="fr">
                </span>
            </p>
            <div class="steps">
                <el-steps :active="step" align-center>
                    <el-step title="上传文件"></el-step>
                    <el-step title="执行导入"></el-step>
                    <el-step title="导入完成"></el-step>
                </el-steps>
            </div>
            <div v-if="step==1">
                <div class="import-bolck"> 
                    <div class="left bg-bl"><i class="icon-xiazai"></i></div>
                    <div class="right ">
                        <p class="right-title">填写导入决策信息</p>
                        <p class="right-secondtitle">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</p>
                        <p class="c-blue"><a class="c-blue" download="决策信息数据录入表格样例.xlsx" :href="this.GLOBAL.loginUrl+'/static/excelTmp/决策数据录入表格样例.xlsx'">下载模板</a></p>
                    </div>
                </div>
                <div class="import-bolck">
                    <div class="left bg-g"><i class="icon-shangchuan"></i></div>
                    <div class="right">
                        <p class="right-title">上传填好的决策信息表 </p>
                        <p class="right-secondtitle">文件后缀名必须为xls 或xlsx （即Excel格式），文件大小不得大于900M</p>
                        
                            <el-upload
                            accept=".xls,.xlsx"
                            ref="upload"
                            class="upload-demo"
                            :action="this.GLOBAL.domainUrl+'/decisions/upload'"
                            :headers="this.uploadHead"
                            multiple
                            :limit="1"
                            :auto-upload="false"
                            :on-success="handleSuccess"
                            :on-change="fileChange"
                            :on-remove="fileRemove"
                            :file-list="filelist"
                            >
                            <p class="c-blue">点击上传</p>
                            </el-upload>
                        
                    </div>
                </div>
            </div>
            <div v-else-if="step==2">
                <div class="import-bolck">
                    <div class="left bg-bl"><i class="icon-xiazai"></i></div>
                    <div class="right ">
                        <p class="right-title">本次可导入决策信息数量</p>
                        <p class="c-blue">{{uploadRes.insertCount}}条</p>
                    </div>
                </div>
                <div class="import-bolck">
                    <div class="left bg-g"><i class="icon-shangchuan"></i></div>
                    <div class="right">
                        <p class="right-title">本次不可导入决策信息数量 </p>
                        <p class="c-blue">{{uploadRes.failCount}}条</p>
                    </div>
                </div>
            </div>
            <div v-else class="importComplete">
                <p><i class="el-icon-success"></i></p>
                <h3>批量导入完成</h3>
                <p>成功导入决策信息数量:{{fileImportRes.insertCount}}条，没能成功导入{{fileImportRes.failCount}}条，更新数据{{fileImportRes.updateCount}}条</p>

            </div>
            <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="150"
				:close-on-click-modal='false'
                :before-close="handleClose">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="progress"></el-progress>
                <p class="pad-t10">正在上传。。。</p>
            </el-dialog>

            <div class="import-next">
                <el-button v-show="step==1" type="primary" size="medium" @click="nextStep">下一步</el-button>
                <el-button v-show="step==2" type="primary" size="medium" @click="nextStep1">下一步</el-button>
                <el-button plain v-show="step==2"  @click="backStep"> 返回重新上传</el-button>
                <el-button v-show="step==3" type="primary" size="medium" @click="complete">完成</el-button>
            </div>
            <tabels :faildata="failList" ref="mytabel" ></tabels> <!-- v-if="step==2"-->
        </div>
    </div>
        
        
</template>
<script>
import tabels from './component/tabel.vue'
export default {
    data(){
        return{
            step:1,
            filelist:[],
            uploadRes:{},
            failList:{},
            progress:30,
            progresstimer:'',
            dialogVisible:false,
            fileName:'',
            fileImportRes:{},
            uploadHead:{
                "Authorization":"Bearer "+localStorage.getItem('token')
            },
            person:{
                current:1,
                size:10
            },
            ids:[]

        }
    },
    components:{tabels},
    mounted:function(){
        
    },
    methods:{
        nextStep(){
            if(this.filelist.length>0){
                this.$refs.upload.submit();
                this.dialogVisible = true;
                this.progressstart();
            }else{
                this.$message.error('请选择上传文件');
            }
        },
        backStep(){
            this.step = 1;
            this.filelist = [];
        },
        handleClose(){
			
            this.dialogVisible  = false;
			this.filelist=[]
			this.$refs.upload.clearFiles()
        },
        fileChange(file, fileList){
            this.filelist = fileList;
        },
        handleSuccess(response, file, fileList){
            this.progress = 100;
            this.dialogVisible = false;
            this.step = 2;
            this.fileName = response.data.fileName;
            this.uploadRes = response.data;
            this.failList = response.data.failList;
            
            clearInterval(this.progresstimer);
            
        },
        fileRemove(){
            this.filelist = [];
        },
        progressstart(){
            var _this = this;
            var time = 30;
            this.progresstimer = setInterval(()=>{
                time +=2;
                _this.progress = time;
                if(time>95){
                    clearInterval(this.progresstimer)
                }
            },100)
        },
        nextStep1(){ 
            var _this = this;
            var caseSelect = this.$refs.mytabel.listCaseSelect;
            var FamilySelect = this.$refs.mytabel.listFamilySelect;
            var WenkongSelect = this.$refs.mytabel.listWenkongSelect;
            var BangfuSelect = this.$refs.mytabel.listBangfuSelect;
            if(!caseSelect.length && !FamilySelect.length && !WenkongSelect.length && !BangfuSelect.length){
                this.$message.error('请选择导入数据');
                return;
            }

            let p1 = new Promise((resolve, reject) => {
                this.$request.post('/decisions/dataImportCase',{
                    ids:caseSelect.toString()
                },function(res){
                    resolve('成功了')
                })
            })

            let p2 = new Promise((resolve, reject) => {
                this.$request.post('/decisions/dataImportFamilyRelation',{
                    ids:FamilySelect.toString()
                },function(res){
                    resolve('成功了')
                })
            })

            let p3 = new Promise((resolve, reject) => {
                this.$request.post('/decisions/dataImportBangfu',{
                    ids:BangfuSelect.toString()
                },function(res){
                    resolve('成功了')
                })
            })
            let p4 = new Promise((resolve, reject) => {
                this.$request.post('/decisions/dataImportWenkong',{
                    ids:WenkongSelect.toString()
                },function(res){
                    resolve('成功了')
                })
            })

            Promise.all([p1, p2, p3, p4]).then((result) => {
                this.step = 3;              
            }).catch((error) => {
               // console.log(error)
            })
        },
        complete(){
            this.filelist = [];
            this.ids = [];
            this.step = 1;
        },
        
        
        
        
    }
}
</script>

<style>
.bor{
    border: 1px solid #f2f2f2;
}
.import{
    margin-left: 20px;
    width: 80%;
    padding-bottom:20px;
    box-shadow: 0px 0px 8px #888888;
}
.steps{
    width: 100%;
    margin: 30px auto;
}
.import-bolck{
    width: 75%;
    box-shadow: 0 0 3px #888888;
    margin: 0 auto 20px auto;
    position: relative;
    display: flex;
}
.import-bolck .left{
    width: 12%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #cccccc;
}
.import-bolck .right{
    width: 88%;
    padding: 15px 10px 15px 20px;
    display: inline-block;
}
.import-bolck .right p{
    font-size: 16px;
    line-height: 30px;
}
.import-bolck .right .right-title{
    color: #666666;
    font-weight: bold;
}
.import-bolck .right-secondtitle{
    font-size: 14px !important;
    color: #999;
}
.c-blue{
    cursor: pointer;
    color: #0079FE;
}
.import-bolck .bg-bl{
    background: rgba(51, 153, 255, 1);
}
.import-bolck .bg-g{
    background: rgba(170, 235, 82, 1);
}
.import-next{
    margin: 50px auto;
    text-align: center;
}
.importComplete{
    text-align: center;
}
.importComplete i{
    font-size: 60px;
    color: #4BD863;
}
.importComplete h3{
    color: #666666;
    line-height: 24px;
    margin-top: 15px;
}
.importComplete p:nth-of-type(2){
    font-size: 14px;
    color: #999999;
    margin-top: 5px;
}
</style>
