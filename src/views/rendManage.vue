<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex xs12>
        <material-card
          color="white"
        >
          <v-card-text>
            <el-table :data="rendData" class="el-coloumn">
              <el-table-column
                label="合同编号"
                prop="rendId"
                width="120"
              />
              <el-table-column
                label="地址"
                prop="rend_address"
                width="170"/>
              <el-table-column
                label="出租人"
                prop="rend_man"
                width="140"/>
              <el-table-column
                prop="rend_start"
                label="合同开始时间">
              </el-table-column>
              <el-table-column
                      label="文件">
                <template slot-scope="scope">
                  <el-button
                          type="primary"
                          size="small"
                          @click="seeFile(scope.row)">
                    查看
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="是否要支付违约金"
                min-width="180" prop="paymoney">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.paymoney === true"
                    size="small"
                    type="primary"
                    >
                    是
                  </el-button>
                  <el-button
                    v-else
                    size="small"
                    type="primary"
                    >否</el-button>
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
  import {getAllRend} from '../api/api'
export default {
  data() {
    return {
      rendData: []
    }
  },
  created() {
    this.rendManage()
  },
  methods: {
    //查看所有租赁信息
    rendManage(){
      getAllRend().then(res => {
        if(res.data.code === 0){
          this.rendData = res.data.data
        }
      })
    }
  }
}
</script>
