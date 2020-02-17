<template>
    <v-container
            fill-height
            fluid
            style="flex-wrap: wrap;"
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
                        <el-table :data="customData">
                            <el-table-column
                                    label="序号"
                                    prop="customId"
                                    width="120"
                            />
                            <el-table-column
                                    label="姓名"
                                    prop="custom_name"
                                    width="170"/>
                            <el-table-column
                                    label="性别"
                                    prop="custom_sex"
                                    width="140"/>
                            <el-table-column
                                    label="年龄"
                                    prop="custom_age"
                                    width="140"/>
                            <el-table-column
                                    prop="custom_phone"
                                    label="手机号">
                            </el-table-column>
                            <el-table-column
                                    label="职业"
                                    prop="custom_occupation"
                                    width="180"/>
                            <el-table-column
                                    label="租房信息"
                                    prop="custom_rendInfo"
                                    width="180"/>
                            <el-table-column
                                    label="租房需求"
                                    prop="custom_rendNeed"
                                    width="180"/>
                            <el-table-column
                                    label="是否签订租房合同"
                                    prop="custom_sign"
                                    width="180"/>
                            <el-table-column
                                    label="介绍人"
                                    prop="custom_introducer"
                                    width="180"/>
                            <el-table-column
                                    label="操作"
                                    min-width="180">
                                <template slot-scope="scope">
                                    <el-button @click="handleModifyCustom">修改</el-button>
                                    <el-button @click="handleDeleteCustom(scope.row.customId)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </v-card-text>
                </material-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  import {getAllCustom, deleteCustom, searchCustom, searchRoom} from '../api/api'

    export default {

        data() {
            return {
                customData: [], //所有客户信息
                sarchCustomVal: '', //搜索客户名字
                modifyCustomDialog: false, //修改客户弹窗
                newCustomDialog: false, //新增客户弹窗
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
                });
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
                key: this.searchroom.replace(/(^\s*)|(\s*$)/g, "")
              }
              searchCustom(params).then(res=> {
                if(res.data.code === 0){
                  this.customData = res.data.data
                }
              })
            },
            //新增客户弹窗
            addNewCustom() {
              this.newCustomDialog = !this.newCustomDialog
            },
            //修改客户弹窗
            handleModifyCustom(){
               this.modifyCustomDialog = !this.modifyCustomDialog
            }
        }

    }
</script>
