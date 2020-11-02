<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? " Sign in" : " Sign up" }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Have an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, failed) in errors">
              <li v-for="(msg, index) in messages" :key="index">
                {{ failed }} {{ msg }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="handleSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                required
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                minlength="8"
                required
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? " Sign in" : " Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../../api/user";

//仅在客户端
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "loginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        email: "1101413469@qq.com",
        password: "pan110650",
        username: "",
      },
      errors: {}, // 错误信息
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 提交表单验证
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
			});
			
        //保存用户登录状态
		this.$store.commit("setUser", data.user);
		
		// 防止刷新页面数据丢失
		Cookie.set('user', data.user)
        this.$router.push("/");
      } catch (error) {
        // console.log('请求失败', error)
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style></style>
