<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="#"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="举报类型"
                    prop="title">
                </el-table-column>
                <el-table-column
                    label="举报内容"
                    prop="content">

                </el-table-column>
                <el-table-column
                    label="被举报人"
                    prop="dealUsername">
                </el-table-column>
                <el-table-column
                    label="被举报视频"
                >
                    <template slot-scope="scope">
                        <a type="primary" :href="'http://localhost:8085/'+ scope.row.videoPath" target="_blank">点我观看</a>
                    </template>
                </el-table-column>
                <el-table-column
                    label="提交用户"
                    prop="submitUsername">
                </el-table-column>
                <el-table-column
                    label="举报日期"
                    prop="createDate">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status === 1"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">禁播</el-button>
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
    // import {getReportsList,forbidVideo} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                limit: 10,
                currentPage: 1,
                count: 0
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
                console.log(val)
                this.currentPage = val;
                this.getBgms()
            },
            async getBgms(){
                const bgms = await getReportsList({current: this.currentPage, size: this.limit});
                console.log(bgms)
                this.tableData = bgms.data.records
                this.count  = bgms.data.total
                this.currentPage = bgms.data.current
            },
            handlePlayClick(index, row) {
                console.log(index, row);
                const serverUrl = 'http://localhost:8085/'
                window.open(serverUrl+row.path,'_blank')
            },
            async handleDelete(index, row) {
                console.log(index, row);
                let result = await forbidVideo({id: row.dealVideoId})
                if (result.status === 200){
                    this.$message({
                        message: '禁播成功',
                        type: 'success'
                    });
                    window.location.reload()
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
