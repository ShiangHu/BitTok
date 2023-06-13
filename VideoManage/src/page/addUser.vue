<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-col :span="12" style="margin-top: 20px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="名字" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avathor">
                    <el-input v-model="ruleForm.avathor"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="sid">
                    <el-input v-model="ruleForm.sid"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="desc">
                    <el-input v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="学校" prop="school">
                    <el-select v-model="ruleForm.school" placeholder="请选择活动区域">
                        <el-option label="安徽大学" value="ahu"></el-option>
                        <el-option label="中国科学技术大学" value="ustc"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">添加用户</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import {POST, GET} from '../request/http'
export default {
    name: "addUser",
    data() {
        return {
            ruleForm: {
                name: '',
                avathor: 'http://127.0.0.1:10000/static/img/default.jpg',
                sid: '',
                password: '',
                desc: '',
                age:'',
                sex:'',
                school:'',
                history: {
                    liked: [],
                    playTime: {}
                }
            },
            rules: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                ],
                avathor: [
                    {require: true, message:'请输入头像地址，默认为: http://127.0.0.1:10000/static/img/default.jpg', trigger: 'blur'}
                ],
                sid:[
                    {required: true, message: '请输入学号', trigger: 'blur'},
                    {pattern: /[A-Z][0-9]{8}$/, message: '学号格式错误'}
                ],
                password:[
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                desc:[
                ],
                age:[
                    {required: true, message: '请输入年龄', trigger: 'blur'},
                ],
                sex:[
                    {required: true, message: '请选择性别', trigger: 'blur'},
                ],
                school: [
                    {required: true, message: '请选择学校', trigger: 'blur'}
                ]
            },
        }
    },
    components: {
        headTop,
    },
    methods: {
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let result = await POST('/admin/addUser', this.ruleForm)
                    console.log(result.data.toString())
                    if(result.data.toString()==='1'){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }else if(result.data.toString()==='0'){
                        this.$message({
                            message: '已有该学号用户，请勿重复添加',
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        message: '请输入完整信息',
                        type: 'error'
                    });
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
