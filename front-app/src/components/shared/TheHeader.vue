<template>
  <div id="nav" v-if="user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/todo">Todo</router-link> |
    <router-link to="/mypage">Mypage</router-link>
  </div>

  <div id="nav" v-else>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/todo">Todo</router-link> |
    <br/>
    <TheNavBar />
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue"
import getUser from "../../composables/getUser"
import TheNavBar from "../TheNavBar.vue"

export default defineComponent({
  name: "TheHeader",
  components: {
    TheNavBar,
  },
  setup() {
    const { user } = getUser();

    return {
      user,
    }
  }
})
</script>
