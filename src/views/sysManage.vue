<template>
    <div>
        <div class="sysManager">
            <div class="sysManager_wrapper">
                <v-container
                        fill-height
                        fluid
                        grid-list-xl>
                    <v-layout wrap
                    >

                        <v-flex xs1 v-show="show">
                            <el-button type="primary" size="small" style="height: 44px;" @click="addNewAdmin">
                                &nbsp;<i class="el-icon-plus"></i>
                                <span>新增员工</span>
                            </el-button>
                        </v-flex>
                        <v-flex xs3>
                            <el-input class="addroominput" :clearable="true" placeholder="请输入员工姓名" v-model="sarchAdminVal">
                                <i slot="suffix" class="el-input__icon el-icon-search" @click="searchAdmin" ></i>
                            </el-input>
                        </v-flex>
                        <v-flex xs12>
                            <material-card
                                    color="white"
                            >
                                <v-card-text>
                                    <el-table :data="userData">
                                        <el-table-column
                                                label="序号"
                                                prop="id"
                                                width="110"
                                                style="text-align: center"/>
                                        <el-table-column
                                                label="姓名"
                                                prop="admin_realname"
                                                width="140"/>
                                        <el-table-column
                                                label="用户名"
                                                prop="admin_name"
                                                width="140"/>
                                        <el-table-column
                                                label="密码"
                                                prop="admin_pwd"
                                                width="140" v-if="show"/>
                                        <el-table-column
                                                label="身份"
                                                prop="admin_kind"
                                                width="140">
                                            <template slot-scope="scope">
                                                <el-button type="danger" size="small" v-if="scope.row.admin_kind==='admin'">
                                                    超级管理员
                                                </el-button>
                                                <el-button type="warning" size="small" v-else style="width: 92px"
                                                          >管理员
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="工作年限/年"
                                                prop="admin_worktime"
                                                width="140"/>
                                        <el-table-column
                                                prop="picture"
                                                label="照片">
                                            <template slot-scope="scope">
                                                <el-button
                                                        type="primary"
                                                        size="small"
                                                        @click="toImg(scope.row)">查看
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                label="业绩"
                                                prop="admin_score"
                                                width="180"/>
                                        <el-table-column
                                                label="备注"
                                                prop="admin_remarks"
                                                width="180" v-if="!show" style="color: red"/>
                                        <el-table-column
                                                label="上次登录"
                                                prop="admin_lastlogin"
                                        />
                                        <el-table-column
                                                label="操作"
                                                min-width="180" v-if="show">
                                            <template slot-scope="scope">
                                                <el-button type="warning" size="small" @click="modifyAdminInfo(scope.row)">
                                                    修改
                                                </el-button>
                                                <el-button type="danger" size="small"
                                                           @click="deleteAdmin(scope.row.id)">删除
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </v-card-text>
                            </material-card>
                        </v-flex>

                    </v-layout>
                </v-container>
            </div>
        </div>
        <!--新增界面-->
        <el-dialog title="新增员工" :visible.sync="showaddadminDialog" class="showaddRoomDialog" @close="showaddadminDialog=false" width="30%">
            <el-form :model="adminEditForm" label-width="80px" :rules="adminEditFormRules" ref="adminruleForm">
                <el-form-item label="姓名" prop="admin_realname">
                    <el-input v-model="adminEditForm.admin_realname"  :clearable="true" max="170" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="admin_name">
                    <el-input v-model="adminEditForm.admin_name" :clearable="true" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="admin_pwd">
                    <el-input v-model="adminEditForm.admin_pwd" :clearable="true" style="width: 300px" show-password></el-input>
                </el-form-item>
                <el-form-item label="工作年限" prop="admin_worktime">
                    <el-input v-model="adminEditForm.admin_worktime" :clearable="true" style="width: 300px">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="业绩" prop="admin_score">
                    <el-input v-model="adminEditForm.admin_score" :clearable="true" style="width: 300px">
                    </el-input>
                </el-form-item>
                <el-form-item label="身份" prop="room_kind">
                    <el-radio-group v-model="adminEditForm.admin_kind">
                        <el-radio class="radio" label="admin" >管理员</el-radio>
                        <el-radio class="radio" label="user">用户</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="admin_remarks">
                    <el-input type="textarea" placeholder="请输入备注" v-model="adminEditForm.admin_remarks" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="resestAdmin('adminruleForm')">取消</el-button>
                <el-button type="primary" @click.native="submitAddNewAdmin('adminruleForm')" :loading="submitRoomSuccess">提交</el-button>
            </div>
        </el-dialog>
        <!--修改界面-->
        <el-dialog title="修改员工信息" :visible.sync="showModifyAdminDialog" class="showModifyRoomDialog" @close="showModifyAdminDialog=false" width="40%">
            <el-form :model="adminmodifyForm" label-width="80px" :rules="adminmodifyFormRules" ref="adminruleForm2">
                <el-form-item label="用户名" prop="admin_name">
                    <el-input v-model="adminmodifyForm.admin_name" :clearable="true" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="admin_pwd">
                    <el-input v-model="adminmodifyForm.admin_pwd" :clearable="true" style="width: 300px" show-password></el-input>
                </el-form-item>
                <el-form-item label="工作年限" prop="admin_worktime">
                    <el-input v-model="adminmodifyForm.admin_worktime" :clearable="true" style="width: 300px">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="业绩" prop="admin_score">
                    <el-input v-model="adminmodifyForm.admin_score" :clearable="true" style="width: 300px">
                    </el-input>
                </el-form-item>
                <el-form-item label="身份" prop="room_kind">
                    <el-radio-group v-model="adminmodifyForm.admin_kind">
                        <el-radio class="radio" label="admin" >管理员</el-radio>
                        <el-radio class="radio" label="user">用户</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" prop="admin_remarks">
                    <el-input type="textarea" placeholder="请输入备注" v-model="adminmodifyForm.admin_remarks" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="resestAdmin2('adminruleForm2')">取消</el-button>
                <el-button type="primary" @click.native="submitModifyNewAdmin('adminruleForm2')" :loading="submitRoomSuccess">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAllAdmin, deleteAdmin, addNewAdmin, modifyAdmin, searchAdminByName} from '../api/api'

    export default {
        data() {
            return {
                //show控制显示老板界面还是员工界面，员工为false,老板为true
                show: false,
                //所有员工数据
                userData: [],
                adminEditForm: {
                    id: '',//员工序号
                    admin_realname: '', //姓名
                    admin_name: '', //用户名
                    admin_pwd: '', //密码
                    admin_kind: '', //用户类别
                    admin_worktime: '',  //工作年限
                    admin_remarks: '',//备注
                    admin_score: '' //业绩
                },
                //新增管理员表单规则
                adminEditFormRules: {
                    admin_realname:[{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    admin_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    admin_pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    admin_kind: [{ required: true, message: '请选择用户类别', trigger: 'blur' }]
                },
                //添加员工
                showaddadminDialog: false,
                submitRoomSuccess:false,
                //修改弹框
                showModifyAdminDialog: false,
                adminmodifyForm: {
                    admin_name: '', //用户名
                    admin_pwd: '', //密码
                    admin_kind: '', //用户类别
                    admin_worktime: '',  //工作年限
                    admin_remarks: '',//备注
                    admin_score: '' //业绩
                },
                adminmodifyFormRules: {

                },
                sarchAdminVal: '' //搜索员工
            }
        },
        created() {
            this.getAllUser()
            //如果是admin类型的用户可以
            if (sessionStorage.getItem('user_kind') === "\"admin\"") {
                this.show = true
            }
        },
        methods: {
            //获取所有管理员
            getAllUser() {
                getAllAdmin().then(res => {
                    console.log(res.data)
                    this.userData = res.data.data
                })
            },
            //超级管理员删除员工
            deleteAdmin(admin_id){
                console.log(admin_id)
                this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        adminId: admin_id
                    }
                    deleteAdmin(params).then(res=> {
                        if(res.data.code === 0){
                            this.getAllUser()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //新增员工弹窗
            addNewAdmin(){
                this.showaddadminDialog = !this.showaddadminDialog
            },
            //提交新增员工
            submitAddNewAdmin(){
                let params = {
                    newAdminInfo: this.adminEditForm
                }
                addNewAdmin(params).then(res=> {
                    if(res.data.code === 0){
                        this.showaddadminDialog = false
                        this.adminEditForm = {}
                        this.getAllUser()
                    }
                })
            },
            //取消新增
            resestAdmin(formName){
                this.showaddadminDialog = false
                this.$refs[formName].resetFields();
            },
            //取消修改
            resestAdmin2(formName){
                this.showModifyAdminDialog = false
                this.$refs[formName].resetFields();
            },
            //修改弹出框
            modifyAdminInfo(Info){
                this.adminmodifyForm =  Object.assign({}, Info)
                this.showModifyAdminDialog = !this.showModifyAdminDialog
            },
            //提交修改员工
            submitModifyNewAdmin(){
                let params = {
                    modifyAdminInfo: this.adminmodifyForm
                }
                modifyAdmin(params).then(res => {
                    if(res.data.code === 0){
                        this.showModifyAdminDialog = false
                        this.getAllUser()
                    }
                })
            },
            //搜索员工
            searchAdmin(){
                let params = {
                    admin_realname: this.sarchAdminVal
                }
                searchAdminByName(params).then(res => {
                    if(res.data.code === 0){
                        this.userData = res.data.data
                    }
                })
            }
        }
    }
</script>

<style>
    .cell {
        text-align: center;
    }
</style>
