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
                    label="视频描述"
                    prop="videoDesc">
                </el-table-column>
                <el-table-column
                    label="观看地址"
                    prop="videoPath">
                    <template slot-scope="scope">
                        <a type="primary" :href="'http://localhost:8085/'+ scope.row.videoPath" target="_blank">点我观看</a>
                    </template>
                </el-table-column>
                <el-table-column
                    label="视频时长"
                    prop="videoSeconds">
                </el-table-column>
                <el-table-column
                    label="获赞数"
                    prop="likeCounts">
                </el-table-column>
                <el-table-column
                    label="发布者"
                    prop="nickname">
                </el-table-column>
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 1">发布中</span>
                        <span v-if="scope.row.status === 2">禁播</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="发布日期"
                    prop="createTime">
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
                const bgms = await getVideoList({current: this.currentPage, size: this.limit});
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
                let result = await forbidVideo({id: row.id})
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
