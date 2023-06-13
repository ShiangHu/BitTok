<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <el-table-column
                    label="短视频"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="情感"
                    prop="emotion">
                </el-table-column>
                <el-table-column
                    label="时长s"
                    prop="time">
                </el-table-column>
                <el-table-column
                    label="保存路径"
                    prop="url">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handlePlayClick(scope.$index, scope.row)">点我播放</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, tableData)">删除</el-button>
                        <el-button
                            size="mini"
                            type="warning"
                            @click="handleUp(scope.$index, scope.row, tableData)">上移</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="limit"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {GET, POST} from '../request/http'
    export default {
        data(){
            return {
                tableData: [],
                search: '',
                limit: 10,
                currentPage: 1,
                count: 0,
                loading: true
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.getBgms();
        },
        methods: {
            handleCurrentChange(val) {
                console.log(val);
                this.currentPage = val;
                this.getBgms();
            },
            async getBgms(){
                const bgms =await GET('/admin/loadVideo');
                this.tableData = bgms.data.list
                // this.tableData.url = this.tableData.url + '.mp4'
                this.count  = this.tableData.length
                this.currentPage = 1
                this.loading = false
            },
            handlePlayClick(index, row) {
                // console.log(index, row);
                // const serverUrl = ''
                // console.log(index)
                window.open(row.url,'_blank')
            },
            async handleDelete(index, row, tableData) {
                //console.log(index, row);
                let result = await POST('/admin/bgmDelete',{url: row.url})
                if (result.status === 200){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    tableData.splice(index, 1);
                    this.count --
                }
            },
            async handleUp(index, row, tableData) {
                if (index === 0) {
                    this.$message({
                        message: '第一个视频无法上移',
                        type: 'error'
                    });
                }
                else{
                    let result = await POST('/admin/bgmUp', {index: index})
                    if (result.status === 200) {
                        this.tableData = tableData
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.handleCurrentChange()
                    }
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
