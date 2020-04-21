<template>
    <div class="chartContent" :style="{width:labelwidth}">
        <p class="headers"><img src="../../../assets/u14234.png" alt="">{{parameter.title}}</p>
        <slot></slot>
        <div :id="parameter.id" :style="{height:labelheigth+'px',width:'100%'}"></div>
        <div v-show="isArray" class="step">
            <div class="controll">
                <div v-show="isplay" class="play" @click="intervalSetting(1)"></div>
                <div v-show="!isplay" class="pause" @click="intervalSetting(2)"></div>
            </div>
            
            <el-steps :active="active" align-center style="width:100%;" >
                <el-step v-for="(item,index) in ArrayData" :key="index" :title="item.timeName"></el-step>
            </el-steps>
        </div>
        
    </div>
</template>
<script>
export default {
    
    props:{
        parameter:Object,
        labelwidth:{
            type:String,
            default:function(){
                return '600px';
            }
        },
        labelheigth:{
            type:Number,
            default:function(){
                return 400;
            }
        },
        
    },
    data(){
        return{
            isArray:false,
            ArrayData:[],
            active:1,
            isplay:false,
            barInterval:null,
            myChart:null
        }
    },
    watch:{
        parameter:{
            handler(){
                //console.log(1)
                this.Bar(this.parameter);
            },
            deep:true
        }
    },
    mounted:function(){
        this.Bar(this.parameter);
    },
    methods:{
        Bar(parameter){
            var _this = this;
            var obj = {...parameter}
            if(obj.time) obj.url = obj.url +'?startTime='+obj.time[0]+'&endTime='+obj.time[1];
            this.$request.get(obj.url,{},function(res){
				console.log(res)
                if(res.result == '1'){
                    var $id = document.getElementById(obj.id);
                    _this.myChart = _this.$echarts.init($id,'light');
                    var getData = res.data;
                    if(Array.isArray(getData)){
                        _this.isArray = true;
                        _this.ArrayData = getData;
                        _this.setTimer(getData)
                    }else{
                        _this.setBar(obj,_this.myChart,getData)
                    }
                }
            })
        },
        setTimer(getData){
            var legth = getData.length;
            this.barInterval = setInterval(() => {
                if(this.active == legth){
                    this.active = 0;
                }
                this.setBar(this.parameter,this.myChart,getData[this.active].barData);
                this.active++;
            },2000)
        },
        setBar(obj,myChart,getData){
            var series = [];
            getData.series.forEach(item=>{
                if(obj.stack){
                    item.stack = '总量';
                }
                item.type = 'bar';
                series.push(item);
            })
            var option = {
                title: {
                    text: '',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
					type:'scroll',
                    data: getData.legend,
                    y: 'bottom'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '7%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel:{
                        interval:0,
                    },
                    data: getData.xAxis
                    
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                series:series
            };
            if(obj.vertical){
                [option.xAxis,option.yAxis] = [option.yAxis,option.xAxis]
            }
            myChart.setOption(option);
        },
        intervalSetting(val){
            switch (val) {
                case 1:
                    this.isplay = false;
                    this.setTimer(this.ArrayData)
                    
                    break;
                case 2:
                    this.isplay = true;
                    clearInterval(this.barInterval);
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style>
.step{
    margin: 10px 10px 0 10px;
    display: flex;
}
.step .controll{
    width: 50px;
}
.play{
    background-color: white;
    box-sizing: border-box;
    height: 30px;
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent black;
}
.pause{
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-style: double;
    border-width: 0px 0px 0px 25px;
    border-color: #202020;
}


</style>


