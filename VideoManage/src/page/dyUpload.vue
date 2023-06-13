<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-col :span="12" style="margin-top: 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="视频名字" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="情感导向" prop="emotion">
                    <el-radio-group v-model="ruleForm.emotion">
                        <el-radio label="积极"></el-radio>
                        <el-radio label="中性"></el-radio>
                        <el-radio label="消极"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="抖音链接" prop="name">
                    <el-input v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即上传</el-button>
                    <el-tooltip class="item" effect="dark" content="视频存储服务数据库中可能有不存在的索引，即视频文件不在redis缓存且永远不会再被索引，点击此按钮清除无效视频文件，释放空间" placement="bottom-start">
                        <el-button @click="clearCache">整理存储空间</el-button>
                    </el-tooltip>

                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
import headTop from '../components/headTop'
// import {addBgm} from "../api/getData";
import {POST, GET} from "../request/http"
export default {
    data(){
        return{
            ruleForm: {
                name: '',
                emotion: '',
                url: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入视频名称', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                emotion: [
                    { required: true, trigger: 'blur' },
                ],
                url: [
                    {required: true, trigger: 'blur' },
                ]
            },
            videoFlag: false,
            //是否显示进度条
            videoUploadPercent: "",
            //进度条的进度，
            isShowUploadVideo: false,
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            }
        }
    },
    components: {
        headTop,
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid && this.ruleForm.url !== '') {
                    console.log(this.ruleForm)
                    let result = await POST('/admin/', this.ruleForm)
                    if (result.status === 200){
                        this.$message({
                            type: 'success',
                            message: '上传成功'
                        });
                        this.$router.push('/bgmList')
                    }
                } else {
                    this.$message({
                        message: '请输入完整信息',
                        type: 'error'
                    });
                    return false;
                }
            })
        },
        async clearCache() {
            let res = await GET('/admin/clearCache')
            if(res.status === 200){
                this.$message({
                    type: 'success',
                    message: '清理缓存成功'
                });
            }else {
                this.$message({
                    type: 'error',
                    message: '请稍后再试'
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        beforeUpload(file) {
            var fileSize = file.size / 1024 / 1024 < 50;
            var FileExt = file.name.replace(/.+\./, "");//后缀
            if (['mp4'].indexOf(FileExt.toLowerCase()) === -1){
                this.$message({
                    type: 'warning',
                    message: '只能上传MP4文件'
                });
                return false;
            }
            if(!fileSize){
                this.$message({
                    type: 'warning',
                    message: '只能上传小于50MB文件'
                });
                return false;
            }
        },
        //进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },
        //上传成功回调
        handleVideoSuccess(res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;


            if (res.Code === 0) {
                this.videoForm.showVideoPath = res.Data;
                this.ruleForm.url = res.Data;
            } else {
                this.$message({
                    message: '上传失败',
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style lang="less">
@import '../style/mixin';
.explain_text{
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
}
</style>
