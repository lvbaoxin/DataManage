<template>
    <div class="chartContent" :style="{width:labelwidth}">
        <p class="headers"><img src="../../../assets/u10082.png" alt="">{{parameter.title}}</p>
        <div class="contents" ref='pie' :id="parameter.id" :style="{height:labelheigth+'px'}"></div>
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
    watch:{
        parameter:{
            handler(){
                this.Pie(this.parameter);
            },
            deep:true
        }
    },
    mounted:function(){
        this.Pie(this.parameter);
    },
    methods:{
        Pie(obj){
            var _this = this;
            
            this.$request.get(obj.url,{},function(res){
                if(res.result == '1'){
                    var myChart = _this.$echarts.init(document.getElementById(obj.id),'light');
                    var getData = res.data;
                    var legendata = [];
                    getData.forEach(item=>{
                        item.labelLine={
                            show:true
                        }
                        if(obj.showlabl){
                           item.label={
                            
                                normal: {
                                    show: true,
                                    position: 'outside',
                                    formatter: '{b}: {c}({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
                                }
                            } 
                        }
                        legendata.push(item);
                    })
                    var option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            type:'scroll',
                            orient: 'horizontal',
                            y: 'bottom',
                            data:legendata
                        },
                        series: [
                            {
                                name:'',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: true,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'center'
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontSize: '20',
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:getData
                            }
                        ]
                    };
                    myChart.setOption(option);
                }
                
            })
        }
    }
}
</script>

