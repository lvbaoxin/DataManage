<template>
    <div class="map-right" v-loading.fullscreen.lock="fullscreenLoading">
        <maps ref="mychild" :listPoCntForGIS="listPoCntForGIS" :classes="'persion'" @showInfo="seeInfo" style="width:80%"></maps>
        <div class="box-card">
            <div class="headers">
                基本信息
            </div>
            <div class="text" style="text-indent:10px;">腾鳌镇</div>
            <div v-for="(item,index) in baseInfo" :key="index" class="text">
                <span class="bg" :style="{ background: colorList[index] }"></span><span>{{item.name}}</span>：{{item.value}}
                <span v-if="item.name == '总户数'">户</span>
                <span v-else>人</span>
            </div>
        </div>
        <div class="right-menu">
            <titles :title="'腾鳌镇GIS信息查询'"></titles>
            <el-form ref="form" :model="form" label-width="80px" style="margin-top:10px;">
                
                <el-form-item label="社区">
                    <el-select v-model="form.communityId" placeholder="请选择社区" @change="changeCommunity">
                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in CommunityForSelect" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="网格">
                    <el-select v-model="form.gridId" placeholder="请选择网格">
                        <el-option :label="item.name" :value="item.code" v-for="(item,index) in GridForSelect" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" >
                    <el-input v-model="form.personName" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.idCard" placeholder="请输入居民身份证号"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input type="textarea" v-model="form.domicileAddress" placeholder="请输入详细地址" ></el-input>
                </el-form-item>
                <el-form-item label="年龄范围">
                    <el-input v-model="form.ageStart" placeholder="年龄下线" ></el-input>
                    <div style="height:10px;"></div>
                    <el-input v-model="form.ageEnd" placeholder="年龄上线"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            
            <ul class="persionList">
                <li v-for="(item,index) in listPoCntForGIS" :key="index">
                    <p>{{index}}、{{item.personName}} {{item.age}} {{item.birth}}</p>
                    <p><img :src="persionIcon" alt=""><span>定位</span><img :src="wenjianicon" alt=""><span @click="seeInfo(item)">查看详细信息</span></p>
                </li>
            </ul>
            <el-pagination
                v-show="totalNum"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="totalNum">
            </el-pagination>
            
            
        </div>
        <el-dialog title="当前常住人口信息" :visible.sync="dialogVisible" width="30%">
            
            <div>
                <p class="dialogInfo"><span class="bg"></span> 公民身份号码：{{persionInfo.idCard}}</p>
                <img class="dialogInfoImg" :src="headeIcon" alt="" />
            </div>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[0] }" ></span> 居住人姓名：{{persionInfo.personName}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[1] }"></span> 性别：{{persionInfo.sex}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[2] }"></span> 民族：{{persionInfo.nation}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[3] }"></span> 出生日期：{{persionInfo.birth}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[4] }"></span> 籍贯：{{persionInfo.nativePlace}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[5] }"></span> 政治面貌：{{persionInfo.politicalStatus}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[6] }"></span> 文化程度：{{persionInfo.qualifications}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[7] }"></span> 婚姻：{{persionInfo.maritalStatus}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[8] }"></span> 联系方式：{{persionInfo.contact}}</p>
            <p class="dialogInfo"><span class="bg" :style="{ background: colorList[0] }"></span> 户籍状况：{{persionInfo.registryConsistency}}</p>
        </el-dialog>
    </div>
</template>
<script>
import maps from './map.vue'
import titles from '../../component/title.vue'
export default {
    data(){
        return{
            form:{},
            form1:{},
            screen:{},
            CommunityForSelect:[],
            GridForSelect:[],
            baseInfo:[],
            current:1,
            size:10,
            listPoCntForGIS:[],
            type:'',
            colorList:['#3399ff','#3bb19c','#ffcc00','#06f','#f60','#dcdcdc','#ffff66','#6361f2'],
            fullscreenLoading:false,
            persionIcon:require('../../../assets/u3907.png'),
            wenjianicon:require('../../../assets/u6936.png'),
            headeIcon:require('../../../assets/u6537.png'),
            dialogVisible:false,
            persionInfo:{},
            totalNum:0
        }
    },
    components:{
        maps,
        titles
    },
    mounted(){
        this.getCommunity();
        this.getBaseinfo(8)
        this.getlistPoPageForGIS()
    },
    watch:{
        $route(to,from){
            this.form1 = {};
            this.screen = {};
            this.type = to.query.type;
            if(this.type)  this.screen[this.type] = '1';
            this.getlistPoPageForGIS();
        }
    },
    methods: {
        getCommunity(){
            this.$request.get('GISPopulation/listCommunityForSelect',{},res=>{
                this.CommunityForSelect = res.data;
            })
        },
        getGrid(id){
            this.$request.get('GISPopulation/listGridForSelect',{
                gridId:id
            },res=>{
                this.GridForSelect = res.data;
            })
        },
        search(){
            this.form1 = {...this.form};
            this.getlistPoPageForGIS();
        },
        changeCommunity(val){
            this.getGrid(val)
        },
        getBaseinfo(id){
            this.$request.get('GISPopulation/listPoCntForGIS',{gridId:id},res=>{
                this.baseInfo = res.data;
            })
        },
        getlistPoPageForGIS(){
            this.fullscreenLoading = true;
            this.$request.get('GISPopulation/listPoPageForGIS',{
                current:this.current,
                size:this.size,
                ...this.form1,
                ...this.screen
            },res=>{
                this.fullscreenLoading = false;
                this.listPoCntForGIS = res.data.records;
                this.$refs.mychild.renderMark(res.data.records);
                this.totalNum = res.data.total;
            },res=>{
                this.fullscreenLoading =false;
            })
        },
        seeInfo(item){
            this.dialogVisible = true;
            this.persionInfo = item;
        },
        handleCurrentChange(val){
            this.current = val;
            this.getlistPoPageForGIS();
        }
    }
}
</script>




