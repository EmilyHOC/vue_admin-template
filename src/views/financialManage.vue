<template>
  <div>
    <v-container
            fill-height
            fluid
    >
      <v-layout
              justify-center
              align-center
      >
        <v-flex xs12>
          <material-card
                  color="white"
          >
            <v-card-text>
              <el-table :data="financialData" class="el-coloumn">
                <el-table-column
                        label="房屋编号"
                        prop="financial_roomId"
                        width="120"
                        style="text-align: center"/>
                <el-table-column
                        label="地址"
                        prop="financial_address"
                        width="170"/>
                <el-table-column
                        label="出租时间"
                        prop="financial_rendtime"
                        width="140"/>
                <el-table-column
                        label="月租"
                        prop="financial_price"
                        width="140"/>
                <el-table-column
                        prop="financial_premoney"
                        label="押金">
                </el-table-column>
                <el-table-column
                        label="水费单价"
                        prop="findancial_waterprice"
                        width="180"/>
                <el-table-column
                        label="水表初始度数"
                        prop="findancial_watermeter"
                        width="180"/>
                <el-table-column
                        label="电费单价"
                        min-width="180"
                        prop="findancial_powerprice"/>
                <el-table-column
                        label="电费初始度数"
                        min-width="180"
                        prop="findancial_powermeter"/>
                <el-table-column
                        label="操作"
                        min-width="180">
                  <template slot-scope="scope">
                    <el-button
                            size="small"
                            type="primary"
                            @click="eviction(scope.row)">
                      退租
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </v-card-text>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!--结算水电费-->
    <el-dialog title="结算房租" :visible.sync="settlementOfRentDialog" class="showaddRoomDialog" @close="settlementOfRentDialog=false" width="40%">
      <el-form :model="payItem" label-width="80px"  ref="ruleForm" :rules="payItemRules" class="labelpay">
        <el-form-item label="水费结算度数" prop="water">
          <el-input  max="170" v-model="payItem.water"></el-input>
        </el-form-item>
        <el-form-item label="电费结算度数" prop="power" >
          <el-input v-model="payItem.power"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="finacialSure('ruleForm')">结算</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {getAllFina} from '../api/api'

export default {
  data() {
    return {
      //结算金额数据
      financialData: [],
      settlementOfRentDialog: false,
      payItem: {
        power:'',
        water: ''
      },
      payItemRules:{
        power: [{required: true, message: '请输入当前电表度数', trigger: 'blur'}],
        water: [{required: true, message: '请输入当前水表度数度数', trigger: 'blur'}] //租或买
      },
      payList: {}
    }
  },
  created() {
    this.getAllFina()
  },
  methods: {
    //退租界面
    eviction(row){
      this.settlementOfRentDialog = !this.settlementOfRentDialog
      this.payList = row
    },
    //确定
    finacialSure(formName){
      this.settlementOfRentDialog = false
      this.$refs[formName].validate((valid) => {
        if(valid){
          var watermoney = this.payList.findancial_waterprice*(this.payItem.water-this.payList.findancial_watermeter)
          var powermoney = this.payList.findancial_powerprice*(this.payItem.power-this.payList.findancial_powermeter)
          console.log(watermoney,powermoney)
          this.settlementOfRentDialog = false
          this.$confirm( `水费应付: ${watermoney},电费应付:${powermoney}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{})
        }
      })
    },
    //财务管理清单
    getAllFina(){
      getAllFina().then(res=> {
        if(res.data.code === 0){
          this.financialData = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>
