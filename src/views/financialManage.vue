<template>
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
                label="总价"
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
                    @click="eviction(scope.row, 2)">
                    退租</el-button>
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


export default {
  data() {
    return {
      financialData: []
    }
  },
  created() {

  },
  methods: {
    //退租
    eviction(){

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
