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
                        label="付款方式"
                        prop="findancial_pay"
                        width="180"/>
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
      <el-form  label-width="80px"  ref="ruleForm">
        <el-form-item label="水费">
          <el-input  max="170" aria-placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="电费" prop="room_usage">
          <el-input>
            <template slot="append">年</template>
          </el-input>
        </el-form-item>
        <el-form-item label="房租">
          <el-input>
            <template slot="append">平方米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="总价" >
          <el-input  :clearable="true">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="finacialSure" >确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>


export default {
  data() {
    return {
      //结算金额数据
      financialData: [],
      settlementOfRentDialog: false,
      payItem: {}

    }
  },
  created() {

  },
  methods: {
    //退租
    eviction(row){
      this.settlementOfRentDialog = !this.settlementOfRentDialog
      this.payItem = row
    },
    //确定
    finacialSure(){
      this.settlementOfRentDialog = false
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
