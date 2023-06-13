<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{active}}</span> 活跃用户</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{count}}</span> 注册用户</div></el-col>
            </el-row>
		</section>
        <visitor-pie :pie-data="{count,active}"></visitor-pie>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import visitorPie from '../components/visitorPie'
	// import {getCount, getToday} from '@/api/getData'
    import {GET, POST} from '../request/http'

    export default {
    	data(){
    		return {
                count:0,
                active:0
    		}
    	},
    	components: {
    		headTop,
            visitorPie,
    	},
    	mounted(){
    	    this.initData()

    	},
        computed: {

        },
    	methods: {
    		async initData(){
                const Users = await GET('/admin/userList')
                this.count = 1862
                this.active = 685
                // console.log(active);
            }
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
