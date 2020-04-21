<template>
    <div class="chartContent" :style="{width:labelwidth}">
        <p class="headers"><img src="../../../assets/u14234.png" alt="">{{parameter.title}}</p>
        <div :id="parameter.id" :style="{height:labelheigth+'px',width:'100%'}"></div>
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
    mounted:function(){
        this.Bar(this.parameter);
    },
    methods:{
        Bar(obj){
            var _this = this;
            this.$request.get(obj.url,{},function(res){
                if(res.result == '1'){
                    var $id = document.getElementById(obj.id);
                    var myChart = _this.$echarts.init($id,'light');
                    var getData = res.data;
                    var series = [];
                    getData.series.forEach(item=>{
                        if(obj.stack){
                            item.stack = '总量';
                        }
                        item.type = 'line';
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
                            y: 'bottom',
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '7%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
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
                }
                
            })
        }
    }
}
</script>

