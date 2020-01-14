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
            <el-table :data="testdata">
              <el-table-column
                label="合同id"
                prop="id"
                width="120"
              />
              <el-table-column
                label="地址"
                prop="name"
                width="170"/>
              <el-table-column
                label="出租人"
                prop="idcard"
                width="140"/>
              <el-table-column
                label="租赁人"
                prop="worktime"
                width="140"/>
              <el-table-column
                prop="picture"
                label="合同开始时间">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="toImg(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="合同结束时间"
                prop="lastlogin"
                width="180"/>
              <el-table-column
                label="是否要支付违约金"
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
                label="跟进人"
                prop="lastlogin"
                width="180"/>
            </el-table>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Country',
        value: 'country'
      },
      {
        sortable: false,
        text: 'City',
        value: 'city'
      },
      {
        sortable: false,
        text: 'Salary',
        value: 'salary',
        align: 'right'
      }
    ],
    items: [
      {
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
        salary: '$35,738'
      },
      {
        name: 'Minerva Hooper',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        salary: '$23,738'
      }, {
        name: 'Sage Rodriguez',
        country: 'Netherlands',
        city: 'Overland Park',
        salary: '$56,142'
      }, {
        name: 'Philip Chanley',
        country: 'Korea, South',
        city: 'Gloucester',
        salary: '$38,735'
      }, {
        name: 'Doris Greene',
        country: 'Malawi',
        city: 'Feldkirchen in Kārnten',
        salary: '$63,542'
      }, {
        name: 'Mason Porter',
        country: 'Chile',
        city: 'Gloucester',
        salary: '$78,615'
      }
    ]
  })
}
</script>
