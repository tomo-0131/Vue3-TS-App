<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="email" required placeholder="email" v-model="email" /><br/>
      <input type="password" required placeholder="password" v-model="password" />
      <div class="error">{{ error }}</div>
    <button class="
      m-5
      px-2
      py-1
      text-green-500
      rounded-md
      cursor-pointer
      hover:text-green-600
      bg-white
      font-medium
      border-2 border-green-500"
      >
      LOG IN
    </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import getUser from '../composables/getUser'
import useLogin from '../composables/useLogin'

export default defineComponent({
  name: "LoginForm",
  setup(props, context) {
    // refs
    const email = ref('')
    const password = ref('')

    const { user } = getUser();
    const { error, login } = useLogin();

    const handleSubmit = async() => {
      await login(email.value, password.value)
      if(!error.value) {
        console.log('既にログイン中です')
        context.emit('login');
      }
    }

    return {
      user,
      email,
      password,
      error,
      handleSubmit,
    }
  }
})
</script>
