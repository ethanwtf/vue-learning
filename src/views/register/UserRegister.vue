<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >

        <b-card title="注册">
          <b-form>
            <b-form-group label="姓名">
              <b-form-input
                v-model="$v.user.name.$model"
                type="text"
                placeholder="输入您的名称"
                :state="validateState('name')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('name')">
                名字不能为空
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                placeholder="输入手机号"
                :state="validateState('telephone')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('telephone')">
                手机号不符合要求
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="输入密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须大于等于 6 位
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                @click="register"
                variant="outline-primary"
                block
              >注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { required, minLength } from 'vuelidate/lib/validators';
import storageService from '@/service/storageService';
import userService from '@/service/userService';

// import customValidator from '@/helper/validator.js';
const telephoneValidator = (value) => /^1[3|4|5|7]\d{9}$/.test(value);
// const axios = require('axios').default;

export default {
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
      },
      validation: null,
    };
  },
  methods: {
    validateState(name) {
      // 这里是es6 解构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      // 验证数据
      // this.validation = true;
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求api
      userService.register(this.user).then((res) => {
        // 保存token
        console.log(res.data);
        storageService.set(storageService.USER_TOKEN, res.data.data.token);
        userService.info().then((response) => {
          // 保存用户信息
          storageService.set(storageService.USER_INFO, JSON.stringify(response.data.data.user));
          // 跳转主页
          this.$router.replace({ name: 'home' });
        });
      }).catch((err) => {
        console.log('err:', err.response.data.msg);
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
      });

      console.log('register');
    },
  },
  validations: {
    user: {
      name: {
        required,
      },
      telephone: {
        required,
        telephone: telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
