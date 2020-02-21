<template>
  <div>

    <v-container
            fill-height
            fluid
            grid-list-xl>
      <v-layout
              wrap
      >
        <div style="width: 150px">
          <el-button type="primary" size="small" style="height: 44px;margin-left: 12px;" @click="addDeviceDialog">
            &nbsp;<i class="el-icon-plus"></i>
            <span>增加设施订单</span>
          </el-button>
        </div>
        <div>
          <el-input  :clearable="true" placeholder="请输入设备订单号" class="inputheight">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <v-flex xs12>
          <material-card
                  color="white"
          >
            <v-card-text>
              <el-table :data="deviceData" class="el-coloumn">
                <el-table-column
                        label="编号"
                        prop="device_Id"
                        width="100"
                />
                <el-table-column
                        label="地址"
                        prop="device_address"
                        width="170"/>
                <el-table-column
                        label="设备名称"
                        prop="device_kind"
                        width="140"/>
                <el-table-column
                        label="使用数量"
                        prop="device_num"
                        width="140"/>
                <el-table-column
                        prop="device_rend"
                        label="租或买">
                  <template slot-scope="scope">
                    <a v-if="scope.row.device_rend === true" type="primary">买</a>
                    <a v-else>租</a>
                  </template>
                </el-table-column>
                <el-table-column
                        label="设备单价"
                        prop="device_price"
                        width="140"/>
                <el-table-column
                        label="是否归还"
                        prop="device_return"
                        width="140">
                  <template slot-scope="scope">
                    <a v-if="scope.row.device_return === true" type="primary">是</a>
                    <a type="danger" v-else>否</a>
                  </template>
                </el-table-column>
                <el-table-column
                        label="开始使用时间"
                        prop="device_start"
                        width="130"/>
                <el-table-column
                        label="归还时间"
                        prop="device_returntime"
                        width="130">

                </el-table-column>
                <el-table-column
                        label="支付费用/元"
                        prop="device_pay">
                  <template slot-scope="scope">
                    <a>{{scope.row.device_price*scope.row.device_num}}</a>
                  </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="device_status">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.device_status === true" type="primary" size="small">已支付</el-button>
                    <el-button type="danger" size="small" v-else>未支付</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                        label="操作" min-width="180"
                >
                  <template slot-scope="scope">
                    <el-button type="primary" size="small" v-if="!scope.row.device_status" @click="paymoney">付款</el-button>
                    <el-button type="primary" size="small" v-if="!scope.row.device_status" @click="returnTo(scope.row.device_Id)">归还</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </v-card-text>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--新增界面-->
    <el-dialog title="新增设施订单" :visible.sync="newDeviceDialog" class="newCustomDialog" @close="newDeviceDialog=false"
               width="35%">
      <el-form :model="deviceEditForm" label-width="80px" :rules="deviceEditFormRules" ref="deviceEditForm">
        <el-form-item label="地址" prop="device_address">
          <el-input v-model="deviceEditForm.device_address" :clearable="true" max="170"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="device_kind">
          <el-input v-model="deviceEditForm.device_kind" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="device_price">
          <el-input v-model="deviceEditForm.device_price" :clearable="true" max="170">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="数量" prop="device_num">
            <el-input v-model="deviceEditForm.device_num" :clearable="true" max="170"></el-input>
        </el-form-item>
        <el-form-item label="租或者买" prop="device_rend">
          <el-radio-group v-model="deviceEditForm.device_rend">
            <el-radio class="radio" :label="false" v-model="deviceEditForm.device_rend">租</el-radio>
            <el-radio class="radio" :label="true" v-model="deviceEditForm.device_rend">买</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="resestDevice('deviceEditForm')">取消</el-button>
        <el-button type="primary" @click.native="submitDevice('deviceEditForm')" >
          提交
        </el-button>
      </div>

    </el-dialog>
  </div>

</template>

<script>
  import {getAllDevice,newDevice} from '../api/api'
export default {
  data(){
    return {

      deviceData: [], //设备数据
      deviceEditForm: {
        device_address: '', //地址
        device_kind: '', //设备名称
        device_price: '',//单价
        device_num: '',
        device_rend: '' //租或买
      },
      deviceEditFormRules: {
        device_address: [{required: true, message: '请输入订单地址', trigger: 'blur'}], //地址
        device_kind: [{required: true, message: '请输入设备名称', trigger: 'blur'}], //设备名称
        device_price: [{required: true, message: '请输入设备单价', trigger: 'blur'}],//单价
        device_num: [{required: true, message: '请输入设备数量', trigger: 'blur'}],
        device_rend: [{required: true, message: '请选择租或者买', trigger: 'blur'}] //租或买
      },
      newDeviceDialog: false,
      submitCustomSuccess: false
    }
  },
  created() {
    this.getAllDevice()
  },
  methods: {
    //获取所有租借设备列表
    getAllDevice(){
      getAllDevice().then(res => {
        if(res.data.code === 0){
          this.deviceData = res.data.data
        }
      })
    },
    addDeviceDialog(){
      this.newDeviceDialog = !this.newDeviceDialog
    },
    //提交新增
    submitDevice(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let time = new Date()
          let create_time = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}}`
          Object.assign(this.deviceEditForm, {device_start: create_time})
          let params = {
            newdevice: this.deviceEditForm
          }
          newDevice(params).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: '新增设备订单成功',
                type: 'success'
              })
              this.newDeviceDialog = false
              this.deviceEditForm = {}
              this.getAllDevice()
              this.submitCustomSuccess = true
            }
          })
        }
      });
    },
    resestDevice(formName){
      this.newDeviceDialog = false
      this.$refs[formName].resetFields();
    },
    //归还设备
    returnTo(deviceid){
      let time = new Date()
      let return_time = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}}`

    },
    //付款
    paymoney(){

    }
  }
}
</script>
