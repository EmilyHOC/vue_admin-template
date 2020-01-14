<template>
  <div>
    <div class="sysManager">
      <div class="sysManager_wrapper">
        <v-container
          fluid
          grid-list-xl
          fill-height>
          <v-layout
          >
            <v-flex xs12>
              <material-card
                color="white"
              >
                <v-card-text>
                  <el-table :data="testdata">
                    <el-table-column
                      label="id"
                      prop="id"
                      width="120"
                      style="text-align: center"/>
                    <el-table-column
                      label="姓名"
                      prop="name"
                      width="170"/>
                    <el-table-column
                      label="身份"
                      prop="idcard"
                      width="140"/>
                    <el-table-column
                      label="工作年限"
                      prop="worktime"
                      width="140"/>
                    <el-table-column
                      prop="picture"
                      label="照片">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          size="small"
                          @click="toImg(scope.row)">查看</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="上次登录时间"
                      prop="lastlogin"
                      width="180"/>
                    <el-table-column
                      label="操作"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testdata: [
        {
          id: 1,
          name: '李四',
          idcard: '管理员',
          worktime: '3年'
        }
      ]
    }
  }
}
</script>

<style>
.cell{
  text-align: center;
}
</style>
