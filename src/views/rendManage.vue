<template>
  <div>

    <v-container
            fill-height
            fluid
            grid-list-xl
    >
        <v-layout
                wrap
        >
          <div style="width: 150px">
            <el-button type="primary" size="small" style="height: 44px;margin-left: 12px;" @click="addRendInfo">
              &nbsp;<i class="el-icon-plus"></i>
              <span>添加租赁信息</span>
            </el-button>
          </div>
          <div>
            <el-input  :clearable="true" placeholder="请输入合同编号" class="inputheight" v-model="rendInfoVal">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="searchRendInfo"></i>
            </el-input>
          </div>
        <v-flex xs12>
          <material-card
                  color="white"
          >
            <v-card-text>
              <el-table :data="rendData" class="el-coloumn">
                <el-table-column
                        label="合同编号"
                        prop="rend_Id"
                        width="140"
                />
                <el-table-column
                        label="地址"
                        prop="rend_address"
                        width="170"/>
                <el-table-column
                        label="租赁人"
                        prop="rend_man"
                        width="140"/>
                <el-table-column
                        label="联系方式"
                        prop="rend_contract"
                        width="140"/>
                <el-table-column
                        prop="rend_start"
                        width="140"
                        label="合同开始时间" :sortable="true" :sort-method="sortByDate">
                      <template slot-scope="scope">
                        {{scope.row.rend_start}}
                      </template>
                </el-table-column>
                <el-table-column
                        prop="rend_end"
                        width="140"
                        label="合同结束时间" :sortable="true" :sort-method="sortByDate">
                  <template slot-scope="scope">
                    {{scope.row.rend_end}}
                  </template>
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
                    <a
                            v-if="scope.row.paymoney === true"
                            size="small"
                            type="primary"
                    >
                      是
                    </a>
                    <a
                            v-else
                            size="small"
                            type="primary"
                    >否</a>
                  </template>
                </el-table-column>
                <el-table-column
                        width="180"
                        label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="deleteRendInfo(scope.row.rend_Id)" size="small">退租</el-button>
                    <el-button type="warning" @click="conRendInfo(scope.row)" size="small">续租</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </v-card-text>
          </material-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!--新增合同-->
    <el-dialog title="新增租赁合同" :visible.sync="addRendDialog" class="addRendDialog" @close="addRendDialog=false"
               width="35%">
      <el-form :model="rendeEditForm" label-width="80px" :rules="rendEditFormRules" ref="rendEditForm">
        <el-form-item label="租赁人" prop="rend_man">
          <el-input v-model="rendeEditForm.rend_man" :clearable="true" max="170"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="rend_address">
          <el-input v-model="rendeEditForm.rend_address" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="rend_start">
          <el-input
                  placeholder="请选择日期"
                  v-model="rendeEditForm.rend_start">
            <i slot="suffix" class="el-input__icon el-icon-date"></i>
          </el-input>
        </el-form-item>
<!--        https://jsonplaceholder.typicode.com/posts/-->
        <el-form-item label="文件" prop="device_num">
          <el-upload
                  class="upload"
                  ref="upload"
                  action=""
                  :on-success="handleAvatarSuccess"
                  :file-list="fileList"
                  :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="resestRend('rendEditForm')">取消</el-button>
        <el-button type="primary" @click.native="submitRend('rendEditForm')" >
          提交
        </el-button>
      </div>

    </el-dialog>
    <!--续租-->
    <el-dialog title="续租" :visible.sync="showconRendInfoDialog" class="showconRendInfoDialog" @close="showconRendInfoDialog=false" width="35%">
      <el-form :model="conrendeEditForm" label-width="80px"  ref="rendEditForm">
        <el-form-item label="续租租期" prop="rend_conrendtime">
          <el-radio-group v-model="conrendeEditForm.rend_conrendtime" style="margin-left: 40px;">
            <el-radio class="radio" :label="3" v-model="conrendeEditForm.rend_conrendtime">三个月</el-radio>
            <el-radio class="radio" :label="6" v-model="conrendeEditForm.rend_conrendtime">半年</el-radio>
            <el-radio class="radio" :label="12" v-model="conrendeEditForm.rend_conrendtime">一年</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="resestRend2('conrendeEditFormRules')">取消</el-button>
        <el-button type="primary" @click.native="submitRend" >
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {getAllRend,searchRendInfo,deleteRend,conRendInfo} from '../api/api'
export default {
  data() {
    return {
      rendData: [],
      rendInfoVal: '',//搜索租赁
      addRendDialog: false,
      fileList:[],
      rendeEditForm:{
        rend_man: '',
        rend_address: '',
        rend_start:'',
        imgUrl: ''
      },
      /*续租*/
      showconRendInfoDialog: false,
      rendEditFormRules:{

      },
      //续租期
      conrendeEditForm:{
        rend_conrendtime:'',
        rend_Id: ''
      },
      strarr: [],
      finaldata: ''
    }
  },
  created() {
    this.rendManage()
  },
  components: {

  },
  computed: {
    conrendtime(){
      return this.conrendeEditForm.rend_conrendtime
    }
  },
  watch:{
    conrendtime(n,o){
      console.log(n,'new')
      var strarr = this.strarr
      if(n===3){
        if(Number(strarr[1])<=9){
          strarr[1] = "0"+(Number(strarr[1])+3)
        }else{
          var cha = (Number(strarr[1])+3)-12
          strarr[0] = String(cha+Number(strarr[0]))
        }
      }else if(n===6){
        if(Number(strarr[1]<=6)){
          strarr[1] = String(Number(strarr[1])+6)
        }else {
          var cha = (Number(strarr[1])+6)-12
          strarr[0] = String(cha+Number(strarr[0]))
        }
      }else{
        strarr[0] = String(Number(strarr[0])+1)
      }
      this.finaldata = strarr.join("-")

    }
  },
  methods: {
    //查看所有租赁信息
    rendManage(){
      getAllRend().then(res => {
        if(res.data.code === 0){
          this.rendData = res.data.data
        }
      })
    },
    //新增租赁信息
    addRendInfo(){
      this.addRendDialog = !this.addRendDialog
    },
    //搜索租赁
    searchRendInfo(){
      let params = {
        searchVal: this.rendInfoVal
      }
      searchRendInfo(params).then(res=> {
        if(res.data.code === 0){
          this.rendData = res.data.data
        }
      })
    },
    //查看文件
    seeFile(){

    },
    //删除租赁信息
    deleteRendInfo(rend_Id){
      this.$confirm('确认退租将删除订单信息，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          rend_Id: rend_Id
        }
        deleteRend(params).then(res=> {
          if(res.data.code === 0){
            this.$message({
              message:'退租成功',
              type: 'success'
            })
            this.rendManage()
          }
        })
       })
    },
    sortByDate(obj1, obj2) {
      let val1 = obj1.rend_start
      let val2 = obj2.rend_start
      return val1 - val2
    },
    resestRend(formName){
      this.addRendDialog = false
      this.$refs[formName].resetFields();
    },
    //提交续租
    submitRend(){
      let params = {
        datetime: this.finaldata,
        rend_Id: this.conrendeEditForm.rend_Id
      }
      conRendInfo(params).then(res=> {
        if(res.data.code===0){
          this.showconRendInfoDialog = false
          this.conrendeEditForm = {}
          this.$message({
            message: '续租成功',
            type: 'success'
          })
        }
      })
    },
    //续租
    conRendInfo(row){
      var strarr = row.rend_end.split("-")
      this.strarr = strarr
      this.showconRendInfoDialog = !this.showconRendInfoDialog
      //拿到结束时间加上月份
      console.log(this.conrendeEditForm.rend_conrendtime)
      this.conrendeEditForm.rend_Id = row.rend_Id


    },
    handleAvatarSuccess(res, file){
      this.rendeEditForm.imgUrl = file.raw
    },
    //取消续租
    resestRend2(formName){
      this.showconRendInfoDialog = false
      this.$refs[formName].resetFields();
    }
  }
}
</script>
