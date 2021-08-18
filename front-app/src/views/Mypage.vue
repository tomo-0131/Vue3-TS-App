<template>
<div>
  <h1>MY PAGE</h1><br/>
  <h2>名前</h2>
    <div> {{ user.displayName }} </div>
  <h2>メールアドレス</h2>
    <div> {{ user.email }} </div><br/>
  <button class="
    m-5
    px-2
    py-1
    text-blue-500
    rounded-md
    cursor-pointer
    hover:text-blue-700
    bg-white
    font-bold
    border-blue-500"
    @click="handleClick">
    ログアウト
  </button>
</div>
</template>

<script>
import { defineComponent } from "vue";
import getUser from "../composables/getUser"
import useLogout from "../composables/useLogout";

export default defineComponent({
  name: "Mypage",
  setup() {
    const { user } = getUser();
    const { error, logout } = useLogout();

    const handleClick = async() => {
      await logout();
      location.reload();
      if(!error.value) {
        console.log("ログアウトしました")
      }
    }

    return {
      error,
      logout,
      user,
      handleClick,
    }
  }
})
</script>

<style>

</style>
