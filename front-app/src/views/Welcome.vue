<template>
  <div class="welcome">
    <div v-if="showLogin">
      <LoginForm @login="enterTodo"/><br/>
      <p>アカウントがない方はこちら<span @click="showLogin = false"> 新規登録 </span></p>
    </div>

    <div v-else>
      <h1>SIGN UP</h1><br>
        <SignupForm @signup="enterTodo" />
      <p>既に登録済みの方はこちら<span @click="showLogin = true"> LOG IN </span></p>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from '../components/LoginForm.vue';
import SignupForm from '../components/SignupForm.vue';
import getUser from "../composables/getUser";

export default defineComponent({
  name: "Welcome",
  components: {
    LoginForm,
    SignupForm,
  },
  setup() {
    const { user } = getUser();
    const showLogin = ref(true);
    const router = useRouter();
    const enterTodo = () => {
      router.push({ path: '/todo' })
    }

    return {
      user,
      showLogin,
      enterTodo,
    }
  },
})
</script>
