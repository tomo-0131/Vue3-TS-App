<template>
  <div class="todo-edit">
    <h1>Todo Edit</h1>

    <router-link :to="'/'" class="button">Back</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TodoEdit",
})
</script>

<style>

</style>
