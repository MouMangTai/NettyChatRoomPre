<template>
  <div>
    <el-row>
      <el-col :span="10">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card" v-if="state.input.curRouter===1">
            <p style="font-size: 30px">RTA</p>

            <el-form :model="form1">
              <table style="text-align: left">
                <tr>
                  <th width="100px" >端口</th>
                  <th width="150px">ip</th>
                  <th width="150px">子网掩码</th>
                  <th >状态</th>
<!--                  <th></th>-->
                </tr>
                <tr>
                  <th>f0/0</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form1.ip1" style="width: 150px" readonly></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form1.subMask1" readonly/>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form1.status1" />
                    </el-form-item>
                  </th>
                </tr>

                <tr>
                  <th>f0/1</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form1.ip2" style="width: 150px" ></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form1.subMask2" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form1.status2" />
                    </el-form-item>
                  </th>
                </tr>

                <tr>
                  <th>s0/0/0</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form1.ip3" style="width: 150px"></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form1.subMask3"/>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form1.status3" />
                    </el-form-item>
                  </th>
                </tr>



                <tr>
                  <th>s0/0/1</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form1.ip4" style="width: 150px" ></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form1.subMask4" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form1.status4" />
                    </el-form-item>
                  </th>
                </tr>
              </table>

            </el-form>
            <el-button @click="submit1" style="float: right;">批量提交</el-button>
            <br>

          </el-card>
          <el-card class="box-card" v-else-if="state.input.curRouter===2">
            <p style="font-size: 30px">RTB</p>

            <el-form :model="form2">
              <table style="text-align: left">
                <tr>
                  <th width="100px" >端口</th>
                  <th width="150px">ip</th>
                  <th width="150px">子网掩码</th>
                  <th>状态</th>
                </tr>


                <tr>
                  <th>f0/0</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form2.ip1" style="width: 150px" readonly></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form2.subMask1" readonly/>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form2.status1" />
                    </el-form-item>
                  </th>

                </tr>

                <tr>
                  <th>f0/1</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form2.ip2" style="width: 150px" ></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form2.subMask2" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form2.status2" />
                    </el-form-item>
                  </th>

                </tr>

                <tr>
                  <th>s0/0/0</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form2.ip3" style="width: 150px" ></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form2.subMask3" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form2.status3" />
                    </el-form-item>
                  </th>

                </tr>



                <tr>
                  <th>s0/0/1</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form2.ip4" style="width: 150px"></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form2.subMask4" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form2.status4" />
                    </el-form-item>
                  </th>

                </tr>
              </table>

            </el-form>


            <el-button @click="submit2" style="float: right;">批量提交</el-button>
            <br>
          </el-card>
          <el-card class="box-card" v-else-if="state.input.curRouter===3" >
            <p style="font-size: 30px">RTC</p>
            <el-form :model="form3">
              <table style="text-align: left">
                <tr>
                  <th width="100px" >端口</th>
                  <th width="150px">ip</th>
                  <th width="150px">子网掩码</th>
                  <th>状态</th>
                </tr>


                <tr>
                  <th>f0/0</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form3.ip1" style="width: 150px" readonly></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form3.subMask1" readonly/>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form3.status1" />
                    </el-form-item>
                  </th>
                </tr>

                <tr>
                  <th>f0/1</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form3.ip2" style="width: 150px" ></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form3.subMask2" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form3.status2" />
                    </el-form-item>
                  </th>
                </tr>

                <tr>
                  <th>s0/0/0</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form3.ip3" style="width: 150px"></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form3.subMask3" />
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form3.status3" />
                    </el-form-item>
                  </th>
                </tr>



                <tr>
                  <th>s0/0/1</th>
                  <th>
                    <el-form-item>
                      <el-input v-model="form3.ip4" style="width: 150px"></el-input>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-input v-model="form3.subMask4"/>
                    </el-form-item>
                  </th>
                  <th>
                    <el-form-item >
                      <el-switch v-model="form3.status4" />
                    </el-form-item>
                  </th>
                </tr>
              </table>

            </el-form>


            <el-button @click="submit3" style="float: right;">批量提交</el-button>
            <br>
          </el-card>


          <el-card class="box-card" v-if="state.input.curRouter===1" >
            <p style="font-size: 30px">终端</p>
            <el-input id="box1" type="textarea" readonly v-model="result1" :rows="10"></el-input>

            <el-input
                v-model="zdinput1"
                placeholder="Please input"
            />
            <el-button @click="submitCommand1">提交命令</el-button>
          </el-card>
          <el-card class="box-card" v-else-if="state.input.curRouter===2" >
            <p style="font-size: 30px">终端</p>
            <el-input id="box2" type="textarea" readonly v-model="result2" :rows="10"></el-input>

            <el-input
                v-model="zdinput2"
                placeholder="Please input"
            />
            <el-button @click="submitCommand2">提交命令</el-button>
          </el-card>
          <el-card class="box-card" v-else-if="state.input.curRouter===3" >
            <p style="font-size: 30px">终端</p>
            <el-input id="box3" type="textarea" readonly v-model="result3" :rows="10"></el-input>

            <el-input
                v-model="zdinput3"
                placeholder="Please input"
            />
            <el-button @click="submitCommand3">提交命令</el-button>
          </el-card>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple-dark">
          <div id="myChart" style="width: 100%;height: 600px"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {reactive} from "@vue/reactivity"
import request from "@/utils/request";
import {ElLoading, ElNotification} from "element-plus";

const state =  reactive({
  input:{
    curRouter:1,
    curRouterIp:""
  }
});
export default {

  name: "Home",
  data(){
    return{
      state,
      form1:{
        ip1:"",
        ip2:"",
        ip3:"",
        ip4:"",
        status1:false,
        status2:false,
        status3:false,
        status4:false,
        subMask1:"",
        subMask2:"",
        subMask3:"",
        subMask4:"",
      },
      form2:{
        ip1:"",
        ip2:"",
        ip3:"",
        ip4:"",
        status1:false,
        status2:false,
        status3:false,
        status4:false,
        subMask1:"",
        subMask2:"",
        subMask3:"",
        subMask4:"",
      },
      form3:{
        ip1:"",
        ip2:"",
        ip3:"",
        ip4:"",
        status1:false,
        status2:false,
        status3:false,
        status4:false,
        subMask1:"",
        subMask2:"",
        subMask3:"",
        subMask4:"",
      },
      tableData:[],
      zdinput1:"",
      zdinput2:"",
      zdinput3:"",
      result1:"",
      result2:"",
      result3:"",
      option:{
        title: {
          text: '路由拓扑'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeLabel: {
              fontSize: 20
            },
            data: [
              {
                name: 'RTA',
                x: 300,
                y: 300
              },
              {
                name: 'RTC',
                x: 800,
                y: 300
              },
              {
                name: 'RTB',
                x: 550,
                y: 100
              },
              {
                name: 'SWITCH',
                x: 550,
                y: 300
              },
              {
                name: 'PC',
                x: 550,
                y: 500
              }
            ],
            links: [
              {
                source: "RTA",
                target: "RTB",
                lineStyle: {
                  color: 'blue',
                  width: 3,
                  curveness: 0.2
                }
              },
              {
                source: "RTB",
                target: "RTC",
                lineStyle: {
                  color: 'blue',
                  width: 3,
                  curveness: 0.2
                }
              },
              {
                source: "SWITCH",
                target: "RTA",
                lineStyle: {
                  color: '#bf9544',
                  width: 3
                }
              },
              {
                source: "SWITCH",
                target: "RTB",
                lineStyle: {
                  color: '#BF9544',
                  width: 3
                }
              },
              {
                source: "SWITCH",
                target: "RTC",
                lineStyle: {
                  color: '#BF9544',
                  width: 3
                }
              },
              {
                source: "SWITCH",
                target: "PC",
                lineStyle: {
                  color: '#BF9544',
                  width: 3
                }
              },
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      }
    }
  },
  created(){
    let _this = this;
    this.drawLine();
    request.get("/network/routerInfo/RTA").then(res => {
      if (res.success==1) {
        this.state.input.curRouterIp = res.data.ip;
        console.log(res.data)
        res.data.ports.forEach(function(item, index) {
          //item 就是当日按循环到的对象
          //index是循环的索引，从0开始
          let newform = _this.form1;
          let newIp = item.ipAddress;
          let newStatus = item.status==0?false:true;
          let newsubMask = item.subMask;
          if(item.name=="f0/0"){
            newform.ip1 = newIp
            newform.status1 = newStatus
            newform.subMask1 = newsubMask
          } else if(item.name=="f0/1"){
            newform.ip2 = newIp
            newform.status2 = newStatus
            newform.subMask2 = newsubMask
          } else if(item.name=="s0/0/0"){
            newform.ip3 = newIp
            newform.status3 = newStatus
            newform.subMask3 = newsubMask
          } else if(item.name=="s0/0/1"){
            newform.ip4 = newIp
            newform.status4 = newStatus
            newform.subMask4 = newsubMask
          }
        })
        console.log(res.data);
      } else {
        ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
      }
    })
    state.input.curRouter = 1;
  },
  methods: {
    submitCommand1(){
      request.post("/network/terminal/RTA", this.zdinput1).then(res => {
        if (res.success==1) {
          this.result1 += res.data;
        } else {
          this.result1 += res.errorInfo;
        }
        const textarea = document.getElementById('box1');
        textarea.scrollTop = textarea.scrollHeight;
      })
    },
    submitCommand2(){
      request.post("/network/terminal/RTB", this.zdinput2).then(res => {
        if (res.success==1) {
          this.result2 += res.data;
        } else {
          this.result2 += res.errorInfo;
        }
        const textarea = document.getElementById('box2');
        textarea.scrollTop = textarea.scrollHeight;
      })
    },
    submitCommand3(){
      request.post("/network/terminal/RTC", this.zdinput3).then(res => {
        if (res.success==1) {
          this.result3 += res.data;
        } else {
          this.result3 += res.errorInfo;
        }
        const textarea = document.getElementById('box3');
        textarea.scrollTop = textarea.scrollHeight;
      })
    },
    submit1(){
      console.log(this.form1);
      let curForm = this.form1;
      let params = [];

      if(curForm.ip2!=null&&curForm.ip2!=""){
        params.push({
          name:"f0/1",
          ipAddress:curForm.ip2,
          status:curForm.status2==false?0:1,
          subMask:curForm.subMask2
        });
      }
      if(curForm.ip3!=null&&curForm.ip3!=""){
        params.push({
          name:"s0/0/0",
          ipAddress:curForm.ip3,
          status:curForm.status3==false?0:1,
          subMask:curForm.subMask3
        });
      }

      if(curForm.ip4!=null&&curForm.ip4!=""){
        params.push({
          name:"s0/0/1",
          ipAddress:curForm.ip4,
          status:curForm.status4==false?0:1,
          subMask:curForm.subMask4
        });
      }

      if(params.length!=0){
        request.post("/network/portConfig/RTA", params).then(res => {
          if (res.success==1) {
            ElNotification.success({title: 'Success', message: "成功", offset: 100,});
          } else {
            ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
          }
        })
      } else {
        ElNotification.error({title: 'Error', message: "参数为空", offset: 100,});
      }

    },
    submit2(){
      console.log(this.form2);
      let curForm = this.form2;
      let params = [];

      if(curForm.ip2!=null&&curForm.ip2!=""){
        params.push({
          name:"f0/1",
          ipAddress:curForm.ip2,
          status:curForm.status2==false?0:1,
          subMask:curForm.subMask2
        });
      }
      if(curForm.ip3!=null&&curForm.ip3!=""){
        params.push({
          name:"s0/0/0",
          ipAddress:curForm.ip3,
          status:curForm.status3==false?0:1,
          subMask:curForm.subMask3
        });
      }

      if(curForm.ip4!=null&&curForm.ip4!=""){
        params.push({
          name:"s0/0/1",
          ipAddress:curForm.ip4,
          status:curForm.status4==false?0:1,
          subMask:curForm.subMask4
        });
      }
      if(params.length!=0){
        request.post("/network/portConfig/RTB", params).then(res => {
          if (res.success==1) {
            ElNotification.success({title: 'Success', message: "成功", offset: 100,});
          } else {
            ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
          }
        })
      }else{
        ElNotification.error({title: 'Error', message: "参数为空", offset: 100,});
      }

    },
    submit3(){
      console.log(this.form3);
      let curForm = this.form3;
      let params = [];
      if(curForm.ip2!=null&&curForm.ip2!=""){
        params.push({
          name:"f0/1",
          ipAddress:curForm.ip2,
          status:curForm.status2==false?0:1,
          subMask:curForm.subMask2
        });
      }
      if(curForm.ip3!=null&&curForm.ip3!=""){
        params.push({
          name:"s0/0/0",
          ipAddress:curForm.ip3,
          status:curForm.status3==false?0:1,
          subMask:curForm.subMask3
        });
      }

      if(curForm.ip4!=null&&curForm.ip4!=""){
        params.push({
          name:"s0/0/1",
          ipAddress:curForm.ip4,
          status:curForm.status4==false?0:1,
          subMask:curForm.subMask4
        });
      }

      if(params.length!=0){
        request.post("/network/portConfig/RTC", params).then(res => {
          if (res.success==1) {
            ElNotification.success({title: 'Success', message: "成功", offset: 100,});
          } else {
            ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
          }
        })
      }else{
        ElNotification.error({title: 'Error', message: "参数为空", offset: 100,});
      }


    },
    drawLine(){
      let _this = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart =null;
      let newPromise = new Promise((resolve) => {
        resolve()
      })
      newPromise.then(() => {
        //	此dom为echarts图标展示dom
        myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption(
            this.option
        );
        myChart.on('click',  (param) => {
          console.log(param.data)
          if(param.data.name=="RTA"){
            request.get("/network/routerInfo/RTA").then(res => {
              if (res.success==1) {
                this.state.input.curRouterIp = res.data.ip;
                console.log(res.data)
                res.data.ports.forEach(function(item, index) {
                  //item 就是当日按循环到的对象
                  //index是循环的索引，从0开始
                  let newform = _this.form1;
                  let newIp = item.ipAddress;
                  let newStatus = item.status==0?false:true;
                  let newsubMask = item.subMask;
                  // if(newIp!=null&&newIp!=""){
                  //   newsubMask = "255.255.255.0"
                  // }
                  if(item.name=="f0/0"){
                    newform.ip1 = newIp
                    newform.status1 = newStatus
                    newform.subMask1 = newsubMask;
                  } else if(item.name=="f0/1"){
                    newform.ip2 = newIp
                    newform.status2 = newStatus
                    newform.subMask2 = newsubMask;
                  } else if(item.name=="s0/0/0"){
                    newform.ip3 = newIp
                    newform.status3 = newStatus
                    newform.subMask3 = newsubMask;
                  } else if(item.name=="s0/0/1"){
                    newform.ip4 = newIp
                    newform.status4 = newStatus
                    newform.subMask4 = newsubMask;
                  }
                })

                console.log(res.data);
              } else {
                ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
              }
            })
            state.input.curRouter = 1;
          }else if(param.data.name=="RTB"){
            request.get("/network/routerInfo/RTB").then(res => {
              if (res.success==1) {
                this.state.input.curRouterIp = res.data.ip;
                console.log(res.data)
                res.data.ports.forEach(function(item, index) {
                  //item 就是当日按循环到的对象
                  //index是循环的索引，从0开始
                  let newform = _this.form2;
                  let newIp = item.ipAddress;
                  let newStatus = item.status==0?false:true;
                  let newsubMask = item.subMask;
                  // if(newIp!=null&&newIp!=""){
                  //   newsubMask = "255.255.255.0"
                  // }
                  if(item.name=="f0/0"){
                    newform.ip1 = newIp
                    newform.status1 = newStatus
                    newform.subMask1 = newsubMask;
                  } else if(item.name=="f0/1"){
                    newform.ip2 = newIp
                    newform.status2 = newStatus
                    newform.subMask2 = newsubMask;
                  } else if(item.name=="s0/0/0"){
                    newform.ip3 = newIp
                    newform.status3 = newStatus
                    newform.subMask3 = newsubMask;
                  } else if(item.name=="s0/0/1"){
                    newform.ip4 = newIp
                    newform.status4 = newStatus
                    newform.subMask4 = newsubMask;
                  }
                })
                console.log(res.data);
              } else {
                ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
              }
            })
            state.input.curRouter = 2;
          }else if(param.data.name=="RTC"){
            request.get("/network/routerInfo/RTC").then(res => {
              if (res.success==1) {

                this.state.input.curRouterIp = res.data.ip;
                console.log(res.data)
                res.data.ports.forEach(function(item, index) {
                  //item 就是当日按循环到的对象
                  //index是循环的索引，从0开始
                  let newform = _this.form3;
                  let newIp = item.ipAddress;
                  let newStatus = item.status==0?false:true;
                  let newsubMask = item.subMask;
                  // if(newIp!=null&&newIp!=""){
                  //   newsubMask = "255.255.255.0"
                  // }
                  if(item.name=="f0/0"){
                    newform.ip1 = newIp
                    newform.status1 = newStatus
                    newform.subMask1 = newsubMask;
                  } else if(item.name=="f0/1"){
                    newform.ip2 = newIp
                    newform.status2 = newStatus
                    newform.subMask2 = newsubMask;
                  } else if(item.name=="s0/0/0"){
                    newform.ip3 = newIp
                    newform.status3 = newStatus
                    newform.subMask3 = newsubMask;
                  } else if(item.name=="s0/0/1"){
                    newform.ip4 = newIp
                    newform.status4 = newStatus
                    newform.subMask4 = newsubMask;
                  }
                })
                console.log(res.data);
              } else {
                ElNotification.error({title: 'Error', message: res.errorInfo, offset: 100,});
              }
            })
            state.input.curRouter = 3;
          }
        });
      })
      // 绘制图表
    }
  }
}
</script>

<style scoped>
</style>