<template>
    <Form id="login" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="Password" prop="password">
            <Input type="password" v-model="formValidate.password" placeholder="Enter your password"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    password: '',
                    mail: '',
                },
                ruleValidate: {
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'The password cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.post('/login',
                            {
                                email:this.formValidate.mail,
                                password:this.formValidate.password
                            }
                        ).then((response)=>{
                            this.$Message.success('Success!');
                            // 将用户信息传递给bus事件总线，然后再传递到header
                            sessionStorage.user = response.data.user.name;
                            // 登录成功保存token到localstorage
                            window.localStorage.setItem('token',response.data.token);
                            this.$router.push({path:'/'});
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })  
            },
            // 重置
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style>
#login{
    max-width: 50%;
    margin: 200px auto;
}
</style>

