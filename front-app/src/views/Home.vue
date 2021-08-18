<template>
  <!-- ログイン中の場合こちらを表示 -->
  <div v-if="user" class="home">
    <h1>WELCOME</h1>
    <h1>{{ user.displayName }} 様</h1>
  </div>

  <!-- 未ログインの場合こちらを表示 -->
  <div v-else>
    <Welcome />
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import Welcome from "../views/Welcome.vue";
import getUser from "../composables/getUser";

export default defineComponent({
  name: "Home",
  components: {
    Welcome,
  },
  setup() {
    const { user } = getUser();

    return {
      user,
    }
  }
});
</script>
