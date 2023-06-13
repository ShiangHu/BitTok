<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index">
                </el-table-column>
                <el-table-column
                  property="name"
                  label="用户名">
                </el-table-column>
                <el-table-column
                  label="用户头像">
                    <template slot-scope="scope">
                        <img :src="tableData[scope.$index].avathor" width="40" height="40" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column
                    property="sid"
                    label="学号"
                    width="">
                </el-table-column>
                <el-table-column
                    property="desc"
                    label="描述">
                </el-table-column>
                <el-table-column
                    property="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    property="sex"
                    label="性别">
                </el-table-column>
                <el-table-column
                    property="school"
                    label="学校">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="详情">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="success"
                            @click="seeUserDetails(scope.$index, scope.row, tableData)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="学生详细信息" :visible.sync="dialogTableVisible">
            <template slot-scope="scope">
            <el-table :data="historyList">
                <el-table-column property="history" label="历史浏览记录" ></el-table-column>
                <el-table-column property="videoName" label="视频名称"></el-table-column>
                <el-table-column property="onlineTime" label="浏览时间"></el-table-column>
            </el-table>
            <el-table :data="likeList">
                <el-table-column property="videoName" label="点赞视频名称" ></el-table-column>
                <el-table-column property="videoSrc" label="点赞视频链接"></el-table-column>
            </el-table>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import {getUserList} from '@/api/getData'
    import {GET, POST} from '../request/http'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dialogTableVisible: false,
                historyList:[],
                likeList:[]
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.getUsers();
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await GET('/admin/userList');
                // console.log(Users.data.userInfo)
                this.tableData = Users.data.userInfo
                // console.log(this.tableData[0].avathor)
                this.count  = this.tableData.length
                this.currentPage = 1
            },
            async handleDelete(index, row, tableData) {
                console.log(index, row);
                let result = await POST('/admin/deleteUser',{sid: row.sid})
                if (result.status === 200){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    tableData.splice(index, 1);
                    this.count --
                }
            },
            async seeUserDetails(index, row, tableData){
                this.dialogTableVisible = true
                // console.log(index, row)
                // console.log(tableData[index].history)
                let vidoeList = await GET('/admin/loadVideo')

                let histurls = Object.keys(tableData[index].history.playTime)
                for(let i = 0; i < histurls.length; i++) {
                    if( i=== 0){
                        this.historyList = []
                    }
                    let temphistoryList = {
                        history: "",
                        videoName: "",
                        onlineTime: ""
                    }
                    for (let j = 0; j < vidoeList.data.list.length; j++){
                        if(vidoeList.data.list[j].url === histurls[i]){
                            temphistoryList.history = histurls[i]
                            temphistoryList.onlineTime = tableData[index].history.playTime[histurls[i]]
                            temphistoryList.videoName = vidoeList.data.list[j].name
                        }
                    }
                    this.historyList.push(temphistoryList)
                }
                let likeurls = tableData[index].history.liked
                console.log(likeurls)
                for(let i = 0; i < likeurls.length; i++){
                    if(i === 0) {
                        this.likeList = []
                    }
                    let tempLikeList = {
                        videoName: "",
                        videoSrc: ""
                    }
                    for(let j = 0; j < vidoeList.data.list.length; j++){
                        if(vidoeList.data.list[j].url === likeurls[i]){
                            tempLikeList.videoName = vidoeList.data.list[j].name
                            tempLikeList.videoSrc = likeurls[i]
                        }
                    }
                    // console.log(tempLikeList)
                    this.likeList.push(tempLikeList)
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
