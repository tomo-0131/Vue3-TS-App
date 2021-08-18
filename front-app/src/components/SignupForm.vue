<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      required
      placeholder="名前"
      v-model="displayName"
    /><br/><br/>

    <input
      type="email"
      required
      placeholder="メールアドレス"
      v-model="email"
    /><br/><br/>

    <input
      type="password"
      required
      placeholder="パスワード"
      v-model="password"
    /><br/>

    <div class="error">{{ error }}</div>

    <button class="
      m-5
      px-3
      py-1
      text-gray-500
      rounded-md
      cursor-pointer
      hover:text-blue-700
      bg-white
      font-bold
      border-2 border-black-500"
      >
      SIGN UP
    </button>

  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useSignup from "../composables/useSignup"

export default defineComponent({
  name: "SignupForm",
  setup(props, context) {
    //ref
    const { error, signup } = useSignup();
    const displayName = ref('');
    const email = ref('');
    const password = ref('')

    const handleSubmit = async() => {
      await signup(email.value, password.value, displayName.value)
      if (!error.value) {
        context.emit('signup') // Welcome.vueに渡す
      }
    }
    return {
      displayName,
      email,
      password,
      handleSubmit,
      error,
    }
  }
})
</script>

<style>

</style>
