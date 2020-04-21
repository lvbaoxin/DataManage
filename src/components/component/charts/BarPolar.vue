<template>
    <div class="chartContent" :style="{width:labelwidth}">
        <p class="headers"><img src="../../../assets/u14234.png" alt="">{{parameter.title}}</p>
        <slot></slot>
        <div :id="parameter.id" :style="{height:labelheigth+'px',width:'100%'}"></div>
        
        
    </div>
</template>
<script>
export default {
    
    props:{
        parameter:Object,
        labelwidth:{
            type:Number,
            default:function(){
                return 600;
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
    mounted:function(){
        this.Bar(this.parameter);
    },
    methods:{
        Bar(obj){
            var _this = this;
            this.$request.get(obj.url,{},function(res){
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
            var num = parseInt(Math.random()*10)
            var colors = ['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#8d98b3','#e5cf0d','#97b552','#3498db','#44c5b5','#999999','#e5cf0d',]
            getData.series.forEach((item,index)=>{
                if(obj.stack){
                    item.stack = '总量';
                }
                item.itemStyle = {
                    normal:{
                        color:colors[index]
                    }
                }
                item.coordinateSystem = 'polar';
                item.type = 'bar';
                series.push(item);
            })
            var option = {
                angleAxis: {
                },
                radiusAxis: {
                    type: 'category',
                    data: getData.xAxis,
                    z: 10
                },
                tooltip : {
                    show: true,
                    
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '7%',
                    containLabel: true
                },
                polar: {
                },
                legend: {
                    type: 'scroll',
                    data: getData.legend,
                    show: true,
                    y: 'bottom',
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



</style>


