<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>用户信息</template>
						<el-menu-item index="userList">用户列表</el-menu-item>
                        <el-menu-item index="addUser">增加用户</el-menu-item>
					</el-submenu>
<!--					<el-submenu index="3">-->
<!--						<template slot="title"><i class="el-icon-plus"></i>举报管理</template>-->
<!--						<el-menu-item index="reportList">举报列表</el-menu-item>-->
<!--					</el-submenu>-->
<!--					<el-submenu index="4">-->
<!--						<template slot="title"><i class="el-icon-star-on"></i>短视频管理</template>-->
<!--						<el-menu-item index="videoList">短视频列表</el-menu-item>-->
<!--						&lt;!&ndash; <el-menu-item index="newMember">用户数据</el-menu-item> &ndash;&gt;-->
<!--					</el-submenu>-->
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>短视频管理</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="bgmList">视频列表</el-menu-item>
                        <el-menu-item index="bgmUpload">添加视频</el-menu-item>
<!--                        <el-menu-item index="dyUpload">抖音爬取</el-menu-item>-->
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
<!--				<keep-alive>-->
				    <router-view></router-view>
<!--				</keep-alive>-->
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
