<template>
    <div class="container">
        <el-button @click="click">点点</el-button>
        <el-dialog title="编辑邮件" :visible.sync="dialogFormVisible" width="30%" class="dialog">
            <el-form :ref="formEl" :model="form" :rules="rules" label-width="100px" class="form">
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="form.username" auto-complete="on"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="初始密码:" prop="password">
                    <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm">重 置</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'Edit',
  data () {
    return {
      dialogFormVisible: false,
      formEl: 'formElement',
      form: {
        username: '',
        email: '',
        password: '',
        remark: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名！', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址！', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址！', trigger: 'blur,change'}
        ],
        password: [
          {required: true, message: '请输入密码！', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    click () {
      this.dialogFormVisible = true
    },
    submit () {
      this.$refs[this.formEl].validate((valid) => { // ref 和 model属性必须
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs[this.formEl].resetFields()
    }
  }
}
</script>
<style scoped>
.container{
  margin-top: 30px;
}

</style>
