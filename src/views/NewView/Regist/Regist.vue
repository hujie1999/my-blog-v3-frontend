<template>
  <div id="regist-page">
    <!-- <h2>regist-page</h2> -->
    <div class="format-control">
        <div class="form-title">
            <h2>Regist</h2>
        </div>
        <el-form :model="userinfo" class="el-form" :rules="rules" ref="userForm">
            <el-form-item label="昵称" prop="nick" size="mini">
                <el-input v-model="userinfo.nick" placeholder="1~15位 字母数字中文格式"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="acc" size="mini">
                <el-input v-model="userinfo.acc" placeholder="6~15位 字母数字格式"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd" size="mini">
                <el-input type="password" v-model="userinfo.pwd" placeholder="6~20位 字母数字格式"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="pwdcheck" size="mini">
                <el-input type="password" v-model="userinfo.pwdcheck" placeholder="6~20位 字母数字格式"></el-input>
            </el-form-item>
            <el-form-item
            label="邮箱" prop="email" size="mini"
            >
                <el-input v-model="userinfo.email"></el-input>
            </el-form-item>
            <el-form-item
            class="btn-area"
            >
                <el-button type="primary" @click="registbtn('userForm')" 
                style=" width:30%"
                size="small"
                :disabled="btnlock"
                >注册</el-button>
                <el-button type="warning" @click="reset('userForm')" 
                style=" width:30%"
                size="small"
                :disabled="btnlock"
                >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { registAPI } from '../../../http/api'
export default {
  name: "Regist",
  data() {
    var checkNick = (rule, value, callback) => {
      if (!value || value.includes(' ')) {
        return callback(new Error("昵称不能为空"));
      }
      setTimeout(() => {
        if(value.length > 15 || value.length < 1) {
          return callback(new Error("昵称长度应为 1~15 位！"));
        } else {
          return callback();
        }
      }, 500);
    };

    var checkAcc = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      let reg = new RegExp("^[A-Za-z0-9]+$");
      setTimeout(() => {
        if (!reg.test(value)) {
          return callback(new Error("账号只能包含数字和字母！"));
        } else if (value.length > 15 || value.length < 5) {
          return callback(new Error("账号长度应为 6~15 位！"));
        } else {
          return callback();
        }
      }, 500);
    };
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      let reg = new RegExp("^[A-Za-z0-9]+$");
      setTimeout(() => {
        if (!reg.test(value)) {
          return callback(new Error("密码只能包含数字和字母！"));
        } else if (value.length > 20 || value.length < 6) {
          return callback(new Error("密码长度应为 6~20 位！"));
        } else {
          return callback();
        }
      }, 500);
    };
    
    var checkSame = (rule, value, callback) => {
      let reg = new RegExp("^[A-Za-z0-9]+$");
      if (!reg.test(value)) {
          return callback(new Error("密码只能包含数字和字母！"));
        }
      if (value === '') {
          callback(new Error('请再次输入密码'));
      }
       else if (value !== this.userinfo.pwd) {
          callback(new Error('两次输入密码不一致!'));
      } else {
          callback();
        }
    };
    var checkEmail = (rule, value, callback) => {
      setTimeout(() => {
        if (value.length > 30) {
          return callback(new Error("邮箱长度不能超过 30 位！"));
        } else {
          return callback();
        }
      }, 500);
    };
    return {
      //须知
      notice:{},
      //用户信息
      userinfo: {
        nick:"",
        acc: "",
        pwd: "",
        pwdcheck:'',
        email:""
      },
      rules: {
        nick:[
          { required: true, message: "请输入昵称", trigger: "blur" },
          { validator: checkNick, trigger: "blur" },
        ],
        acc: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: checkAcc, trigger: "blur" },
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkPwd, trigger: "blur" },
        ],
        pwdcheck:[
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: checkSame, trigger: "blur" },
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          { validator: checkEmail, trigger: "blur" }
        ]
      },
      //提交按钮锁
      //同时控制 按钮的disabled
      btnlock:false
    }

    
  },
  methods:{
      reset(userForm){
        this.$refs[userForm].resetFields()
      },
      //点击注册用户
      registbtn(userForm){
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            // alert('submit!');
            //验证成功，提交信息存入数据库
            // console.log(this.userinfo)
            if(!this.btnlock){
              this.registUser()
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //注册用户方法
      registUser(){
        this.btnlock = true
        registAPI({userinfo:this.userinfo})
        .then(res=>{
          let temp = res.data;
          if (temp.code == 1020) {
            this.$notify({
              title: '成功',
              type: "success",
              message: "注册成功，正在跳转登录页面...",
            });
            setTimeout(() => {
              this.$router.push('/login')
            }, 3000);
          } 
          else if (temp.code == 1021) {
            this.$notify({
              title: '出错了',
              message: temp.errMsg,
              type: "error",
            });
          }
          else if (temp.code == 1022) {
            this.$notify({
              title: '失败',
              message: "注册失败，昵称长度或格式不合法！",
              type: "error",
            });
          }
          else if (temp.code == 1023) {
            this.$notify({
              title: '失败',
              message: "注册失败，账号长度或格式不合法！",
              type: "error",
            });
          }
          else if (temp.code == 1024) {
            this.$notify({
              title: '失败',
              message: "注册失败，密码长度或格式不合法！",
              type: "error",
            });
          }
          else if (temp.code == 1025) {
            this.$notify({
              title: '失败',
              message: "注册失败，邮箱长度或格式不合法！",
              type: "error",
            });
          }
          else if (temp.code == 1026) {
            this.$notify({
              title: '失败',
              message: "注册失败，该账号已存在！",
              type: "error",
            });
          }
          this.btnlock = false
          this.reset('userForm')
        })
        .catch(err=>{
          console.log(err)
          this.btnlock = false
        })
      },
      handleFocus(){
        console.log('focus')
      }
  },
  created(){
    this.notice = this.$notify({
      title: '须知',
      message: "注册成功后即可登录，同时信息也会提交至审核;"+
      "对于不当的用户信息等，审核不通过将无法再次登录！"+
      "同时注意，密码请随机设置，能记住即可，别用任何与自己关联的真实密码！！！",
      type: "warning",
      duration:0
    })

    this.$nextTick(()=>{
      let inputlist = this.$refs.userForm.$el.querySelectorAll('input')
      inputlist.forEach(element => {
        element.onfocus = ()=>{
          // console.log('focus')
          //关闭notice
          this.notice.close()
        }
      });
      
      
    })
    
  },
  beforeDestroy(){
    this.notice.close()
  },
  watch:{
  }
};
</script>

<style scoped>
#regist-page {
  height: 100vh;
  width: auto;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}
.format-control {
  height: 450px;
  width: 250px;
  padding: 0px 15px;
  background: #fff;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  border-radius: 20px;
}
.format-control:hover{
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 6px 0 rgb(0 0 0 / 16%);
}

.form-title{
    padding: 10px 0px 0px 0px;
    text-align: center;
}
.btn-area{
    margin-top: 10px;
}


.el-form-item{
    margin-bottom: 5px !important;
}

</style>