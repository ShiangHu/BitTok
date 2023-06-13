<template>
    <div class="visitorpie">
        <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData(){
                const option = {
                    title : {
                        text: '活跃占比',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        show:true,
                        trigger: 'item',
                        formatter: '{a}   {b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['北京','上海','深圳','杭州','其他']
                    },
                    color:['#41cac0','#ff766c'],
                    series : [
                        {
                            name: '活跃占比',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}: {c}({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
                                }
                            },
                            data:[
                                {value:this.pieData.count-this.pieData.active, name:'不活跃'},
                                {value:this.pieData.active, name:'活跃'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            pieData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .visitorpie{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
