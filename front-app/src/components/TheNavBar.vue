<template>
  <nav v-if="user">
    <div>
      <h1>ログイン名: {{ user.displayName }}</h1>
      <p class="email">メールアドレス: {{ user.email }}</p>
    </div><br/>
    <button @click="handleClick">LOGOUT</button>
  </nav>
</template>

<script lang="ts">
import router from "../router"
import { defineComponent } from "vue";
import getUser from "../composables/getUser";
import useLogout from "../composables/useLogout";

export default defineComponent({
  name: "TheNavBar",
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();

    const handleClick = async() => {
      await logout();
        location.reload();
        router.push({ path: '/' })
      if(!error.value) {
        console.log("ログアウトしました")
      };
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
