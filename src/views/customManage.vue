<template>
    <div>
        <v-container
                fill-height
                fluid
                grid-list-xl
        >
            <v-layout wrap>
                <v-flex xs1>
                    <el-button type="primary" size="small" style="height: 44px;" @click="addNewCustom">
                        &nbsp;<i class="el-icon-plus"></i>
                        <span>新增客户</span>
                    </el-button>
                </v-flex>
                <v-flex xs3>
                    <el-input class="addroominput" :clearable="true" placeholder="请输入客户姓名姓名" v-model="sarchCustomVal">
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchCustom"></i>
                    </el-input>
                </v-flex>
                <v-flex xs12>
                    <material-card
                            color="white"
                    >
                        <v-card-text>
                            <el-table :data="customData" class="el-coloumn">
                                <el-table-column
                                        label="序号"
                                        prop="customId"
                                        width="100"
                                />
                                <el-table-column
                                        label="姓名"
                                        prop="custom_name"
                                        width="120"/>
                                <el-table-column
                                        label="性别"
                                        prop="custom_sex"
                                        width="100"/>
                                <el-table-column
                                        label="年龄"
                                        prop="custom_age"
                                        width="100"/>
                                <el-table-column
                                        prop="custom_phone"
                                        label="手机号" width="160">
                                </el-table-column>
                                <el-table-column
                                        label="职业"
                                        prop="custom_occupation"
                                        width="140"/>
                                <el-table-column
                                        label="租房信息"
                                        prop="custom_rendInfo"
                                        width="160"/>
                                <el-table-column
                                        label="租房需求"
                                        prop="custom_rendNeed"
                                        width="160"/>
                                <el-table-column
                                        label="是否签订合同"
                                        prop="custom_sign"
                                        width="130">
                                    <template slot-scope="scope">
                                        <a v-if="scope.row.custom_sign === true">是</a>
                                        <a v-else>否</a>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="介绍人"
                                        prop="custom_introducer"
                                        width="180"/>
                                <el-table-column
                                        label="操作"
                                        min-width="180">
                                    <template slot-scope="scope">
                                        <el-button @click="handleModifyCustom(scope.row)" type="warning" size="small">修改</el-button>
                                        <el-button @click="handleDeleteCustom(scope.row.customId)" type="danger" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </v-card-text>
                    </material-card>
                </v-flex>
            </v-layout>

        </v-container>
        <!--新增界面-->
        <el-dialog title="新增客户" :visible.sync="newCustomDialog" class="newCustomDialog" @close="newCustomDialog=false"
                   width="40%">
            <el-form :model="customEditForm" label-width="80px" :rules="customEditFormRules" ref="customruleForm">
                <el-form-item label="姓名" prop="custom_name">
                    <el-input v-model="customEditForm.custom_name" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="custom_age">
                    <el-input v-model="customEditForm.custom_age" :clearable="true">
                        <template slot="append">岁</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="性别" prop="custom_sex">
                    <el-radio-group v-model="customEditForm.custom_sex">
                        <el-radio class="radio" label="男">男</el-radio>
                        <el-radio class="radio" label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号" prop="custom_phone">
                    <el-input v-model="customEditForm.custom_phone" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="职业" prop="custom_occupation">
                    <el-input v-model="customEditForm.custom_occupation" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="租房需求" prop="custom_rendNeed">
                    <el-input v-model="customEditForm.custom_rendNeed" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="租房信息" prop="custom_rendInfo">
                    <el-input v-model="customEditForm.custom_rendInfo" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="签订合同" prop="custom_sign">
                    <el-radio-group v-model="customEditForm.custom_sign">
                        <el-radio class="radio" label="true">是</el-radio>
                        <el-radio class="radio" label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="resestCustom('customruleForm')">取消</el-button>
                <el-button type="primary" @click.native="submitCustom('customruleForm')" :loading="submitCustomSuccess">
                    提交
                </el-button>
            </div>

        </el-dialog>
        <!--修改界面-->
        <el-dialog title="修改客户信息" :visible.sync="modifyCustomDialog" class="modifyCustomDialog"
                   @close="modifyCustomDialog=false" width="40%">
            <el-form :model="customModifyForm" label-width="80px" :rules="customModifyFormRules"
                     ref="custommodifyruleForm">
                <el-form-item label="手机号" prop="custom_phone">
                    <el-input v-model="customModifyForm.custom_phone" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="租房信息" prop="custom_rendInfo">
                    <el-input v-model="customModifyForm.custom_rendInfo" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="是否签订租房需求" prop="custom_sign">
                    <el-radio-group v-model="customModifyForm.custom_sign">
                        <el-radio class="radio" :label="true" v-model="customModifyForm.custom_sign">是</el-radio>
                        <el-radio class="radio" :label="false" v-model="customModifyForm.custom_sign">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="modifyResetCustom('custommodifyruleForm')">取消</el-button>
                <el-button type="primary" @click.native="modifysubmitCustom('custommodifyruleForm')"
                           :loading="submitModifyCustomSuccess">提交
                </el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {getAllCustom, deleteCustom, searchCustom, newCustom, modifyCustom} from '../api/api'

    export default {

        data() {
            var valiNumberPass2 = (rule, value, callback) => {//正整数
                let reg = /^[+]{0,1}(\d+)$/g;
                if (value === '') {
                    callback(new Error('请输入内容'));
                } else if (!reg.test(value)) {
                    callback(new Error('请输入0及0以上的整数'));
                } else {
                    callback();
                }
            };
            return {
                customData: [], //所有客户信息
                sarchCustomVal: '', //搜索客户名字
                modifyCustomDialog: false, //修改客户弹窗
                newCustomDialog: false, //新增客户弹窗
                customEditForm: {
                    custom_name: '', //客户姓名
                    custom_age: '', //年龄
                    custom_sex: '', //性别
                    custom_phone: '',//手机号
                    custom_occupation: '',//职业
                    custom_rendInfo: '', //租房信息
                    custom_rendNeed: '',//租房需求
                    custom_sign: ''//是否签订租房合同
                },
                submitCustomSuccess: false,
                customEditFormRules: {
                    custom_name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    custom_age: [{required: true, validator: valiNumberPass2, trigger: 'blur'}],
                    custom_sex: [{required: true, message: '请选择客户性别', trigger: 'blur'}],
                    custom_phone: [{required: true, message: '请输入手机号', trigger: 'blur'}],
                    custom_sign: [{required: true, message: '请选择客户是否签订租房合同', trigger: 'blur'}],
                    custom_rendInfo: [{required: true, message: '请填写租房信息', trigger: 'blur'}]
                },
                //修改客户信息
                customModifyForm: {
                    custom_phone: '',
                    custom_rendInfo: '',
                    custom_sign: ''

                },
                submitModifyCustomSuccess: false,
                customModifyFormRules: {}
            }
        },
        created() {
            this.getAllCustom()
        },
        methods: {
            //获取所有顾客列表
            getAllCustom() {
                getAllCustom().then(res => {
                    if (res.data.code === 0) {
                        this.customData = res.data.data
                    }
                })
            },
            //删除客户信息
            handleDeleteCustom(customId) {
                this.$confirm('此操作将永久删除此客户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {
                        customId: customId
                    }
                    deleteCustom(param).then(res => {
                        if (res.data.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getAllCustom()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            },
            //搜索客户
            searchCustom() {
                let params = {
                    key: this.sarchCustomVal.replace(/(^\s*)|(\s*$)/g, "")
                }
                searchCustom(params).then(res => {
                    if (res.data.code === 0) {
                        this.customData = res.data.data
                    }
                })
            },
            //新增客户弹窗
            addNewCustom() {
                this.newCustomDialog = !this.newCustomDialog

            },
            //修改客户弹窗
            handleModifyCustom(custom) {
                this.modifyCustomDialog = !this.modifyCustomDialog
                this.customModifyForm =  Object.assign({}, custom)
            },
            //取消新增客户
            resestCustom(formName) {
                this.newCustomDialog = false
                this.$refs[formName].resetFields();
            },
            //提交新增
            submitCustom(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            newCustom: this.customEditForm
                        }
                        newCustom(params).then(res => {
                            if (res.data.code === 0) {
                                this.$message({
                                    message: '新增客户成功',
                                    type: 'success'
                                })
                                this.newCustomDialog = false
                                this.customEditForm = {}
                                this.getAllCustom()
                                this.submitCustomSuccess = true
                            }
                        })
                    }
                });
            },
            //取消修改客户信息
            modifyResetCustom(formName) {
                this.modifyCustomDialog = false
                this.$refs[formName].resetFields();
            },
            //修改客户信息
            modifysubmitCustom() {
                let params = {
                    modifyInfo: this.customModifyForm
                }
                modifyCustom(params).then(res => {
                    if (res.data.code === 0) {
                        this.modifyCustomDialog = false
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.customModifyForm = {}
                        this.getAllCustom()
                    }
                })
            }
        }

    }
</script>
