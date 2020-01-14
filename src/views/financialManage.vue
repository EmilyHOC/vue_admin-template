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
            <el-table :data="testdata">
              <el-table-column
                label="房屋编号"
                prop="id"
                width="120"
                style="text-align: center"/>
              <el-table-column
                label="地址"
                prop="name"
                width="170"/>
              <el-table-column
                label="出租时间"
                prop="idcard"
                width="140"/>
              <el-table-column
                label="价格"
                prop="worktime"
                width="140"/>
              <el-table-column
                prop="picture"
                label="押金">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="toImg(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="水费单价"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="水表初始度数"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="电费单价"
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
              <el-table-column
                label="电费初始度数"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="付款方式"
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
</template>

<script>
const leader = 'I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.'
const leaderShort = leader.slice(0, 105) + '...'
const material = 'The Life of Material Dashboard'
const small = 'Header with small subtitle'

export default {
  data: () => ({
    typography: {
      'heading-1': ['Header 1', material, 'h1'],
      'heading-2': ['Header 2', material, 'h2'],
      'heading-3': ['Header 3', material, 'h3'],
      'heading-4': ['Header 4', material, 'h4'],
      'heading-5': ['Header 5', material, 'h5'],
      'heading-6 text-uppercase': ['Header 6', material, 'h6'],
      '': ['Paragraph', leader, 'p'],
      'quote': ['Quote', leader, 'blockquote'],
      'text--disabled': ['Muted Text', leaderShort, 'p'],
      'text-primary': ['Primary Text', leaderShort, 'p'],
      'text-info': ['Info Text', leaderShort, 'p'],
      'text-success': ['Success Text', leaderShort, 'p'],
      'text-warning': ['Warning Text', leaderShort, 'p'],
      'text-danger': ['Danger Text', leaderShort, 'p'],
      'small': ['Small Tag', small, 'h2']
    }
  })
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
