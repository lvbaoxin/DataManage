<template>
    
        <el-dialog :visible.sync="detailVisble" width="80%">
            <ul class="dialogList clearfix" style="margin-bottom:20px;">
                <li class="fl">
                    <p>姓名</p>
                    <p>{{detailData.personName}}</p>
                </li>
                <li class="fl">
                    <p>公民身份证号码</p>
                    <p>{{detailData.idCard}}</p>
                </li>
                <li class="fl">
                    <p>性别</p>
                    <p>{{detailData.sex}}</p>
                </li>
                <li class="fl">
                    <p>文化程度</p>
                    <p>{{detailData.qualifications}}</p>
                </li>
                
            </ul>
            <el-tabs type="border-card">
                <el-tab-pane label="家庭关系">
                    <ul class="dialogList clearfix" v-for="(item,index) in listFamilyRelation" :key="index">
                        <li class="fl">
                            <p>关系</p>
                            <p>{{item.relationType}}</p>
                        </li>
                        <li class="fl">
                            <p>姓名</p>
                            <p>{{item.relationPerson}}</p>
                        </li>
                        <li class="fl">
                            <p>居住地</p>
                            <p>{{item.domicileAddress}}</p>
                        </li>
                        <li class="fl">
                            <p>出生年月</p>
                            <p>{{item.birth}}</p>
                        </li>
                        <li class="fl">
                            <p>政治面貌</p>
                            <p>{{item.politicalStatus}}</p>
                        </li>
                        <li class="fl">
                            <p>收入状况</p>
                            <p>{{listFamilyRelation.incomeStatus}}</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="工作关系">
                    <ul class="dialogList clearfix" v-for="(item,index) in listWork" :key="index">
                        <li class="fl">
                            <p>工作单位</p>
                            <p>{{item.servicePlace}}</p>
                        </li>
                        <li class="fl">
                            <p>职位</p>
                            <p>{{item.occupation}}</p>
                        </li>
                        <li class="fl">
                            <p>状态</p>
                            <p>{{item.occupationStatus}}</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="帮扶情况">
                    <ul class="dialogList clearfix" v-for="(item,index) in listBangfu" :key="index">
                        <li class="fl">
                            <p>帮扶日</p>
                            <p>{{item.bangfuTime}}</p>
                        </li>
                        <li class="fl">
                            <p>帮扶人</p>
                            <p>{{item.personName}}</p>
                        </li>
                        <li class="fl">
                            <p>帮扶事项</p>
                            <p>{{item.bangfuType}}</p>
                        </li>
                        <li class="fl">
                            <p>帮扶情况</p>
                            <p>{{item.bangfuRemark}}</p>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="稳控情况">
                    <ul class="dialogList clearfix" v-for="(item,index) in listWenkong" :key="index">
                        <li class="fl">
                            <p>稳控日</p>
                            <p>{{item.wenkongTime}}</p>
                        </li>
                        <li class="fl">
                            <p>稳控责任人</p>
                            <p>{{item.wenkongPerson}}</p>
                        </li>
                        <li class="fl">
                            <p>稳控情况</p>
                            <p>{{item.wenkongRemark}}</p>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    
</template>
<script>
export default {
    data(){
        return{
            listFamilyRelation:{},
            listWork:{},
            listBangfu:{},
            listWenkong:{},
            detailVisble:false
        }
    },
    props:{
        detailData:Object
    },
    mounted(){
    },
    methods:{
        getInfo(obj){
            this.detailVisble = true;
            this.$request.get('decisions/listFamilyRelation',{
                personName:obj.personName,
                idCard:obj.idCard
            },res=>{
                this.listFamilyRelation = res.data || [];
            })
            this.$request.get('decisions/listWork',{
                personName:obj.personName,
                idCard:obj.idCard
            },res=>{
                this.listWork = res.data || [];
            })
            this.$request.get('decisions/listBangfu',{
                personName:obj.personName,
                idCard:obj.idCard
            },res=>{
                this.listBangfu = res.data || [];
            })
            this.$request.get('decisions/listWenkong',{
                personName:obj.personName,
                idCard:obj.idCard
            },res=>{
                this.listWenkong = res.data || [];
            })
        },

    }
}
</script>
<style>
.dialogList{
    display: flex;
    flex-wrap: wrap;
}
.dialogList li P{
    min-width: 120px;
    height: 30px;
    padding: 10px 10px;
    line-height: 30px;
    text-align: center;
    border-right:1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3; 
    word-break: break-all;
}
.dialogList li P:nth-of-type(1){
    
    background: #f5f5f5;
}
.dialogList li P:nth-of-type(2){
    color: #000;
}
</style>
