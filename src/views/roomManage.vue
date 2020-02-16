<template>
    <div>
        <v-container
                fill-height
                fluid
                grid-list-xl
        >
            <v-layout wrap>
                <v-flex xs1>
                    <el-button type="primary" @click="addNewRoom" size="small" style="height: 44px;">
                        &nbsp;<i class="el-icon-plus" ></i>
                        <span>新增房源</span>
                    </el-button>
                </v-flex>
                <v-flex xs3>
                    <el-input  class="addroominput" :clearable="true" v-model="searchroom"  placeholder="请输入小区名称" >
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchAddress"></i>
                    </el-input>
                </v-flex>
                <v-flex xs12>
                    <material-card
                            color="white"
                    >
                        <v-card-text>
                            <el-table :data="roomData" class="el-coloumn">
                                <el-table-column
                                        label="房源号"
                                        prop="roomid"
                                        width="120"
                                        style="text-align: center"/>
                                <el-table-column
                                        label="地址"
                                        prop="room_address"
                                        width="180"/>
                                <el-table-column
                                        label="使用年限(/年)"
                                        prop="room_usage"
                                        width="140"/>
                                <el-table-column
                                        label="房源面积(/平方米)"
                                        prop="room_area"
                                        width="140" />
                                <el-table-column
                                        label="房屋租赁状态"
                                        prop="room_rend"
                                        width="140">
                                    <template slot-scope="scope">
                                        <el-button
                                                v-if="scope.row.room_rend === 0"
                                                size="small"
                                                type="warning"
                                        >已出租</el-button>
                                        <el-button
                                                v-if="scope.row.room_rend === 1"
                                                size="small"
                                                type="primary"
                                                class="btn"
                                        >未出租</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="创建时间"
                                        prop="create_time"
                                        width="180"/>
                                <el-table-column
                                        label="备注"
                                        prop="remarks"
                                        min-width="200"/>
                                <el-table-column
                                        label="修改信息"
                                        min-width="180"
                                       >
                                    <template slot-scope="scope">
                                        <el-button type="warning" size="small" @click="modifyRoom(scope.row)">修改</el-button>
                                        <el-button type="danger" size="small" @click="deleteRoom(scope.row.roomid)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </v-card-text>
                    </material-card>
                </v-flex>
            </v-layout>
        </v-container>
        <!--新增界面-->
        <el-dialog title="新增房源" :visible.sync="showaddRoomDialog" class="showaddRoomDialog" @close="showaddRoomDialog=false" width="40%">
            <el-form :model="roomEditForm" label-width="80px" :rules="roomEditFormRules" ref="ruleForm">
                <el-form-item label="地址" prop="room_address">
                    <el-input v-model="roomEditForm.room_address" :clearable="true" max="170"></el-input>
                </el-form-item>
                <el-form-item label="使用年限" prop="room_usage">
                    <el-input v-model="roomEditForm.room_usage" :clearable="true">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="面积" prop="room_area">
                    <el-input v-model="roomEditForm.room_area" :clearable="true">
                        <template slot="append">平方米</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="出租与否" prop="room_rend">
                    <el-radio-group v-model="roomEditForm.room_rend">
                        <el-radio class="radio" label="0">已出租</el-radio>
                        <el-radio class="radio" label="1">未出租</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder="请输入备注" v-model="roomEditForm.remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="resestRoom('ruleForm')">取消</el-button>
                <el-button type="primary" @click.native="submitRoom('ruleForm')" :loading="submitRoomSuccess">提交</el-button>
            </div>

        </el-dialog>
        <!--修改界面-->
        <el-dialog title="修改房源" :visible.sync="showModifyRoomDialog" class="showModifyRoomDialog" @close="showModifyRoomDialog=false" width="40%">
            <el-form :model="roomModifyForm" label-width="80px" :rules="roomModifyFormRules" ref="modifyruleForm">
                <el-form-item label="使用年限" prop="room_usage">
                    <el-input v-model="roomModifyForm.room_usage" :clearable="true">
                        <template slot="append">年</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="面积" prop="room_area">
                    <el-input v-model="roomModifyForm.room_area" :clearable="true">
                        <template slot="append">平方米</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="出租与否" prop="room_rend">
                    <el-radio-group v-model="roomModifyForm.room_rend">
                        <el-radio class="radio"  v-model="roomModifyForm.room_rend" :label="0">已出租</el-radio>
                        <el-radio class="radio" v-model="roomModifyForm.room_rend"  :label="1">未出租</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" placeholder="请输入备注" v-model="roomModifyForm.remarks" style="resize: none; "></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="modifyResestRoom('modifyruleForm')">取消</el-button>
                <el-button type="primary" @click.native="modifysubmitRoom('modifyruleForm')" :loading="submitRoomSuccess">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getAllRoom, addNewRoom, deleteRoom, modifyRoom, searchRoom } from '../api/api'
import Qs from 'qs'
export default {
  data () {
    return {
      //所有房源数据存放数组
      roomData: [],
      //新增房源变量
      showaddRoomDialog: false,
      roomEditForm: {
          room_address: '', //地址
          room_usage: '', //使用年限
          room_area: '', //面积
          room_rend: '',  //是否已出租
          remarks: ''//备注
      },
      //新增房源表单规则
      roomEditFormRules: {
          room_address:[{ required: true, message: '请填写房源地址', trigger: 'blur' }],
          room_area: [{ required: true, message: '请填写房源使用面积', trigger: 'blur' }],
          room_rend: [{ required: true, message: '请选择是否出租', trigger: 'blur' }]
      },
       //
      roomModifyFormRules: {

      },
      //搜索房间
      searchroom: '',
      submitRoomSuccess: false,
      //修改房源信息弹窗
      showModifyRoomDialog: false,
      roomModifyForm: {
          room_usage: '', //使用年限
          room_area: '', //面积
          room_rend: '',  //是否已出租
          remarks: ''//备注
      }
    }
  },
  created () {
    this.getAllRoom()
  },
  methods: {
      //请求房源
      getAllRoom(){
          getAllRoom().then(res => {
              if (res.data) {
                  console.log(res.data)
                  this.roomData = res.data.data
              }
          })
      },
      //添加房源
      addNewRoom(){
          this.showaddRoomDialog = !this.showaddRoomDialog
      },
      //提交新增房源
      submitRoom(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  console.log(this.roomEditForm)
                  let time = new Date()
                  let create_time = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
                  Object.assign(this.roomEditForm,{create_time:create_time})
                  addNewRoom(Qs.stringify(this.roomEditForm)).then(res=> {
                      if(res.data){
                          this.showaddRoomDialog = false
                          this.roomEditForm = {}
                          this.getAllRoom()
                      }
                  })
              }
          });
      },
      //取消新增房源按钮
      resestRoom(formName){
          this.showaddRoomDialog = false
          this.$refs[formName].resetFields();
      },
      //删除房源
      deleteRoom(roomid){
          this.$confirm('此操作将永久删除该房源, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              let params = {
                  roomid: roomid
              }
              deleteRoom(params).then(res => {
                 console.log(res)
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                 this.getAllRoom()
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      //修改房源信息
      modifyRoom(room){
          this.showModifyRoomDialog = !this.showModifyRoomDialog
          this.roomModifyForm =  Object.assign({}, room)
      },
      //修改房源提交
      modifysubmitRoom(formName){
          console.log(this.roomModifyForm)
          this.$refs[formName].validate((valid) => {
              if (valid) {
                modifyRoom(this.roomModifyForm).then(res=> {
                    console.log(res)
                    if(res.data){
                        this.showModifyRoomDialog = false
                        this.getAllRoom()
                    }
                })
              }
          });
      },
      //取消修改房源按钮
      modifyResestRoom(formName){
          this.showModifyRoomDialog = false
          this.$refs[formName].resetFields();
      },
      //根据地址搜索房源
      handleSearchAddress(){
          let params = {
              key: this.searchroom.replace(/(^\s*)|(\s*$)/g, "")
          }
          searchRoom(params).then(res=> {
              if(res.data){
                  console.log(res.data.data)
                  this.roomData = res.data.data
              }
          })
      }
  }
}
</script>
<style>


</style>
