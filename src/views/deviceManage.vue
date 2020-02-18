<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex xs12>
        <material-card
          color="white"
        >
          <v-card-text>
            <el-table :data="deviceData" class="el-coloumn">
              <el-table-column
                label="编号"
                prop="device_Id"
                width="120"
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
              </el-table-column>
              <el-table-column
                label="设备单价"
                prop="device_price"
                width="180"/>
              <el-table-column
                label="是否归还"
                prop="device_return"
                width="180"/>
              <el-table-column
                label="开始使用时间"
                prop="device_start"
                width="180"/>
              <el-table-column
                label="归还时间"
                prop="device_returntime"
                width="180"/>
              <el-table-column
                label="支付费用"
                min-width="180" prop="device_pay">
                <template slot-scope="scope">

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
  import {getAllDevice} from '../api/api'
export default {
  data(){
    return {
      deviceData: []
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
    }
  }
}
</script>
