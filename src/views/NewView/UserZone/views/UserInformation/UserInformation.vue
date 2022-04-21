<template>
  <div id="user-iformation">
      <h2>UserInformation</h2>
        <div class="avatar-block">
            <h5>头像:</h5>
            <div class="avatar-div"
            @click="handleShowArea('avatar')"
            >
                <img :src="chosen_avatar_url==''?userimgbaseurl+avatar_url:userimgbaseurl+chosen_avatar_url" alt="user-avatar">
            </div>
            <div class="avatar-opreat"
            v-if="show_area=='avatar'"
            >
                <el-button size="mini" type="success"
                @click="submitAvatar"
                >提交</el-button>
            </div>
        </div>
        <div class="uniqueid-block">
            <h5>UniqiueId:</h5>
            <div class="uniqueid-div">
                <p v-text="uniqueid"></p>
            </div>
        </div>
        <div class="nickname-block">
            <h5>昵称:</h5>
            <div class="nickname-div">
                <el-input type="text" style="width:200px" size="small" 
                @focus="handleShowArea('nickname')"
                v-model="nickname"
                maxlength="15"
                show-word-limit
                ></el-input>
            </div>
            <div class="nickname-opreat"
            v-if="show_area=='nickname'"
            >
                <el-button size="mini" type="success"
                @click="submitNickName"
                >提交</el-button>
            </div>
        </div>
        <div class="account-block">
            <h5>账号:</h5>
            <div class="account-div">
                <p v-text="account"></p>
            </div>
        </div>
        <div class="password-block">
            <h5>密码:</h5>
            <div class="password-div">
                <el-input 
                type="password" 
                style="width:200px" 
                size="small"
                show-password
                v-model="password"
                ></el-input>
            </div>
        </div>
        <div class="password-block">
            <h5>新密码:</h5>
            <div class="password-div">
                <el-input 
                type="password" 
                style="width:200px" 
                size="small"
                show-password
                @focus="handleShowArea('password')"
                v-model="newpassword"
                ></el-input>
            </div>
            <div class="password-opreat"
            v-if="show_area=='password'"
            >
                <el-button size="mini" type="success"
                @click="submitPassword"
                >提交</el-button>
            </div>
        </div>
        <div class="gender-block">
            <h5>性别:</h5>
            <div class="gender-div" 
            @click="handleShowArea('gender')"
            >
                <el-radio v-model="gender" label="1">男</el-radio>
                <el-radio v-model="gender" label="2">女</el-radio>
            </div>
            <div class="gender-opreat"
            v-if="show_area=='gender'"
            >
                <el-button size="mini" type="success"
                @click="submitGender"
                >提交</el-button>
            </div>
        </div>
        <div class="email-block">
            <h5>邮箱:</h5>
            <div class="email-div">
                <el-input type="text" style="width:200px" size="small"
                @focus="handleShowArea('email')"
                v-model="email"
                maxlength="30"
                show-word-limit
                ></el-input>
            </div>
            <div class="email-opreat"
            v-if="show_area=='email'"
            >
                <el-button size="mini" type="success"
                @click="submitEmail"
                >提交</el-button>
            </div>
        </div>
        <div class="phonenumber-block">
            <h5>手机号:</h5>
            <div class="phonenumber-div">
                <el-input type="text" style="width:200px" size="small"
                @focus="handleShowArea('phonenumber')"
                v-model="phonenumber"
                maxlength="11"
                show-word-limit
                ></el-input>
            </div>
            <div class="phonenumber-opreat"
            v-if="show_area=='phonenumber'"
            >
                <el-button size="mini" type="success"
                @click="submitPhoneNumber"
                >提交</el-button>
            </div>
        </div>
        <div class="introduction-block">
            <h5>介绍:</h5>
            <div class="introduction-div">
                <el-input 
                style="width:270px"
                :autosize="{ minRows: 3, maxRows: 5}"
                maxlength="50"
                type="textarea"
                show-word-limit
                @focus="handleShowArea('introduction')"
                v-model="introduction"
                ></el-input>
            </div>
            <div class="introduction-opreat"
            v-if="show_area=='introduction'"
            >
                <el-button size="mini" type="success"
                @click="submitIntroduction"
                >提交</el-button>
            </div>
        </div>
        <!-- 头像列表 dialog -->
        <el-dialog title="头像列表" :visible.sync="dialog_show">
            <div class="avatar-dia">
                <div class="avatar-list">
                    <span
                    class="loop-container"
                    v-for="(url,index) in avatar_list" 
                    :key="index"
                    >
                        <el-image                       
                        :src="userimgbaseurl+url"
                        @click="handleUrl(url,index)"
                        :class="chosen_avatar_index==index?'img-active':''"
                        lazy>
                        </el-image>
                    </span>
                </div>
                <el-button type="primary" size="small"
                @click="confirmAvatar"
                >确定</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import setting from '../../../../../setting'
import{
    getavatarsAPI,
    getuserinfoAPI,
    updateavatarAPI,
    updatenicknameAPI,
    updatepasswordAPI,
    updategenderAPI,
    updateemailAPI,
    updatephonenumberAPI,
    updateintroductionAPI
} from '../../http/user_api'
export default {
    name:'UserInformation',
    data(){
        return{
            //图片基础路径
            userimgbaseurl:setting.imgbaseurl,
            //操作按钮显示的区域
            show_area:'',
            //头像列表
            avatar_list:[],


            //avatar 地址
            // avatar_url:'',
            avatar_url:this.$store.getters.userinfo.avatar,

            nickname:'',
            uniqueid:'',
            account:'',
            password:'',
            //新密码
            newpassword:'',
            //gender 0 未选择,1 男，2 女
            gender: '0',
            email:'',
            phonenumber:'',
            introduction:'',

            dialog_show:false,
            //被选中的头像地址
            chosen_avatar_url:'',
            chosen_avatar_index:null
        }
    },
    computed:{
    },
    methods:{
        handleShowArea(area){
            // console.log(area)
            this.show_area = area
            if(area == 'avatar'){
                this.getAvatars()
                this.dialog_show = true
                
            }else{
                this.dialog_show =false
                this.chosen_avatar_url = ''
                this.chosen_avatar_index = null
            }
        },
        //获取用户账号信息
        getUserInfomation(){
            let userinfo = this.$store.getters.userinfo
            getuserinfoAPI({
                Account:userinfo.account,
                UniqueId:userinfo.uniqueid
            }).then(res=>{
                let tempinfo = Object.values(res.data)[0]
                // this.avatar_url = tempinfo.User_Avatar
                // this.avatar_url = this.$store.getters.userinfo.avatar
                this.uniqueid = tempinfo.User_UniqueId
                this.nickname = tempinfo.User_Nickname
                this.account = tempinfo.User_Account
                this.password = tempinfo.User_Password
                this.gender = String(tempinfo.User_Gender)
                this.email = tempinfo.User_Email
                this.phonenumber = tempinfo.User_PhoneNumber
                this.introduction = tempinfo.User_Introduction
            }).catch(err=>{consolelog(err)})
        },
        //获取头像列表
        getAvatars(){
            getavatarsAPI().then(res=>{
                let templist = Object.values(res.data)[0].Avatars.split(',')
                templist = templist.filter(v=>{
                    return v!=''
                })
                this.avatar_list = templist
                // console.log(templist)
            }).then(err=>{console.log(err)})
        },
        //选取头像
        handleUrl(url,index){
            this.chosen_avatar_url = url
            this.chosen_avatar_index = index
        },
        confirmAvatar(){
            this.dialog_show = false
        },
        //更新头像
        submitAvatar(){
            console.log(this.chosen_avatar_url)
            updateavatarAPI({
                UserAvatar:this.chosen_avatar_url,
                UserUniqueId:this.uniqueid
            })
            .then(res=>{
                // console.log(res.data)
                    this.$notify({
                        title: '成功',
                        message: '更新头像成功',
                        type: 'success'
                    });
                this.$store.commit('modifyUserAvatar',this.chosen_avatar_url)
                this.show_area = ''
                this.getUserInfomation()
                // this.router.go(0)
            })
            .catch(err=>{console.log(err)})
        },
        //新昵称验证
        checkNickName(){
            //判空与判断长度
            if(this.nickname.length<=15&&this.nickname.split(' ').join('').length!=0){
                return true
            }
            else{
                return false
            }
        },
        //更新昵称
        submitNickName(){
            if(this.checkNickName()){
                // console.log('ok')
                updatenicknameAPI({
                    UserNickName:this.nickname,
                    UserUniqueId:this.uniqueid
                }).then(res=>{
                    // console.log(res)
                    this.show_area = ''
                    this.$store.commit('modifyUserNickname',this.nickname)
                    this.$message({
                        type:'success',
                        message:'昵称更新成功'
                    })
                }).catch(err=>{console.log(err)})
            }else{
                // console.log('error')
                this.$message({
                    type:'error',
                    message:'昵称不能为空'
                })
            }
        },
        //新密码验证
        checkPassword(){
            let reg = new RegExp("^[A-Za-z0-9]+$")
            
            if(this.newpassword.length>20 || this.newpassword.length<6){
                return 1
            }
            else if(this.newpassword.split(' ').join('').length==0){
                return 2
            }
            else if(!reg.test(this.newpassword)){
                return 3
            }
            else{
                return 4
            }
            
        },
        //更新密码
        submitPassword(){
            if(this.checkPassword()===1){
                // console.log('密码长度应为6~20位')
                this.$message({
                    type:'error',
                    message:'密码长度应为6~20位'
                })
            }
            else if(this.checkPassword()===2){
                // console.log('密码不能为空')
                this.$message({
                    type:'error',
                    message:'密码不能为空'
                })
            }
            else if(this.checkPassword()===3){
                // console.log('密码只能包含数字与字母')
                this.$message({
                    type:'error',
                    message:'密码只能包含数字与字母'
                })
            }
            else if(this.checkPassword()===4){
                console.log('ok')
                updatepasswordAPI({
                    Password:this.password,
                    NewPassword:this.newpassword,
                    UserUniqueId:this.uniqueid
                }).then(res=>{
                    console.log(res)
                    this.$message({
                        type:'success',
                        message:'密码更新成功'
                    })
                    const newpwd = this.newpassword
                    this.newpassword = ''
                    this.password = newpwd
                    this.show_area = ''

                }).catch(err=>{console.log(err)})
            }
        },
        //更新性别
        submitGender(){
            updategenderAPI({
                Gender:this.gender,
                UserUniqueId:this.uniqueid
            }).then(res=>{
                // console.log(res)
                this.$message({
                    type:'success',
                    message:'性别更新成功'
                })
                this.show_area = ''
            }).catch(err=>{console.log(err)})
        },
        //新邮箱验证
        checkEmail(){
            let reg =/^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i
            if(this.email.length>30){
                return 1
            }
            else if(!reg.test(this.email)){
                return 2
            }
            else{
                return 3
            }
        },
        //更新邮箱
        submitEmail(){
            if(this.checkEmail()===1){
                // console.log('邮箱长度不能超过30位')
                this.$message({
                    type:'error',
                    message:'邮箱长度不能超过30位'
                })
            }
            else if(this.checkEmail()===2){
                // console.log('邮箱格式不正确')
                this.$message({
                    type:'error',
                    message:'邮箱格式不正确'
                })
            }
            else if(this.checkEmail()===3){
                console.log('ok')
                updateemailAPI({
                    Email:this.email,
                    UserUniqueId:this.uniqueid
                }).then(res=>{
                    // console.log(res)
                    this.$message({
                        type:'success',
                        message:'邮箱更新成功'
                    })
                    this.show_area = ''
                }).catch(err=>{console.log(err)})
            }
        },
        //新手机号码验证
        checkPhoneNumber(){
            let reg = /[^0-9]/g
            if(this.phonenumber.length>11 || this.phonenumber.length<5){
                return 1
            }
            else if(this.phonenumber.split(' ').join('').length==0){
                return 2
            }
            else if(reg.test(this.phonenumber)){
                return 3
            }
            else{
                return 4
            }
        },
        //更新手机
        submitPhoneNumber(){
            if(this.checkPhoneNumber()===1){
                // console.log('长度错误')
                this.$message({
                    type:'error',
                    message:'手机号长度为5~11位'
                })
            }
            else if(this.checkPhoneNumber()===2){
                // console.log('手机号码不能为空')
                this.$message({
                    type:'error',
                    message:'手机号码不能为空'
                })
            }
            else if(this.checkPhoneNumber()===3){
                // console.log('手机号码必须为数字')
                this.$message({
                    type:'error',
                    message:'手机号码必须为纯数字'
                })
            }
            else if(this.checkPhoneNumber()===4){
                // console.log('ok')
                updatephonenumberAPI({
                    PhoneNumber:this.phonenumber,
                    UserUniqueId:this.uniqueid
                }).then(res=>{
                    // console.log(res)
                    this.$message({
                        type:'success',
                        message:'手机号更新成功'
                    })
                    this.show_area = ''
                }).catch(err=>{console.log(err)})
            }
        },
        //新简介验证
        checkIntroduction(){
            if(this.introduction.length>50){
                return false
            }
            else{
                return true
            }
        },
        //更新简介
        submitIntroduction(){
            if(this.checkIntroduction()==false){
                this.$message({
                    type:'error',
                    message:'简介字数最大为50'
                })
            }else if(this.checkIntroduction()==true){
                // console.log('ok')
                updateintroductionAPI({
                    Introduction:this.introduction,
                    UserUniqueId:this.uniqueid
                }).then(res=>{
                    this.$message({
                        type:'success',
                        message:'简介更新成功'
                    })
                    this.show_area = ''
                }).catch(err=>{console.log(err)})
            }
        }

    },
    created(){
        this.getUserInfomation()
    },
    mounted(){
        if(this.avatar_url==''){
            this.$notify.warning({
                title: '提示',
                message: '您还没设置头像，点击“头像”框，设置一个自己喜欢的头像吧...',
                duration: 8000
            });
        }
    },

}
</script>
<style>
.el-dialog {
    width: 85%;
}
</style>
<style scoped>
#user-iformation{
    overflow: auto;
    padding-left: 10px;
    height:100%;
    width: 100%;
}
#user-iformation .el-input{
    margin-left: 15px;
    margin-right: 15px;
}
#user-iformation .el-textarea{
    margin-left: 15px;
    margin-right: 15px;
}
.gender-div{
    margin-left: 15px;
    margin-right: 15px;
}
.avatar-block{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.avatar-div{
    width: 80px;
    height: 80px;
    border-radius: 40px;
    border: 1px solid rgb(221, 218, 218);
    /* background: blueviolet; */
    overflow: hidden;
    margin-left: 15px;
    margin-right: 15px;
}
.avatar-div:hover{
    box-shadow: 0 0 5px 0 rgba(0 0 0 /20%);
}
.avatar-div img{
    height: 80px;
    width: 80px;
}
.uniqueid-block{
    display: flex;
    align-items: center;
}
.nickname-block{
    display: flex;
    align-items: center;
}
.account-block{
    display: flex;
    align-items: center;
}
.password-block{
    display: flex;
    align-items: center;
}
.gender-block{
    display: flex;
    align-items: center;
}
.email-block{
    display: flex;
    align-items: center;
}
.phonenumber-block{
    display: flex;
    align-items: center;
}
.introduction-block{
    display: flex;
    align-items: center;
}

.avatar-dia{
    height: 350px;
    width:100%;
    /* background: cornsilk; */
    position: relative;

}
.avatar-list{
    height: 300px;
    width: 100%;
    overflow: auto;
    /* background: cyan; */
}
.el-image{
    width: 110px;
    height: 110px;
    margin: 5px !important;
}


.el-image:hover{
    position: relative;
    /* border: 1px solid gold; */
    box-shadow: 0 0 5px 0 rgba(0 0 0 /20%);
}
/* 被选取的头像active类 */
.img-active{
    box-shadow: 0 0 5px 0 rgba(0 0 0 /20%);
}
.avatar-dia button{
    position: absolute;
    bottom: 10px;
    left: 10px;
}
</style>