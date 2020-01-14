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
            <el-table :data="testdata">
              <el-table-column
                label="编号"
                prop="id"
                width="120"
              />
              <el-table-column
                label="地址"
                prop="name"
                width="170"/>
              <el-table-column
                label="使用设备"
                prop="idcard"
                width="140"/>
              <el-table-column
                label="使用数量"
                prop="worktime"
                width="140"/>
              <el-table-column
                prop="picture"
                label="租或买">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="toImg(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="设备单价"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="是否归还"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="开始使用时间"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="归还时间"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="支付费用"
                min-width="180">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.reviewstatus === '0'"
                    size="small"
                    type="primary"
                    @click="reviewTrend(scope.row, 2)">不通过</el-button>
                  <el-button
                    v-if="scope.row.reviewstatus === '0'"
                    size="small"
                    type="primary"
                    class="btn"
                    @click="reviewTrend(scope.row, 1)">通过</el-button>
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
  //
}
</script>
