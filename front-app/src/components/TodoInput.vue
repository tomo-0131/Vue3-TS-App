<template>
  <div class="flex flex-wrap content-center h-13">
    <div class="text-left flex-grow-3">
      <input @keyup.enter="createTodo"
        v-model="state.title"
        placeholder="Todoを入力"
        class="
        w-full
        px-2
        py-4
        border border-white
        rounded-md
        focus:outline-none"/>
    </div>
  </div>
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
    border-1 border-blue-500"
    @click="createTodo">
    Create
  </button>

  <Loading :active="isLoading" :can-cancel="true" :is-full-page="fullPage" />

</template>

<script lang="ts">
import router from "../router"
import { defineComponent, reactive, ref } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import axios from "axios";

const baseURL = "http://localhost:3000/";

export default defineComponent({
  name: "TodoInput",
  components: {
    Loading
  },

  setup() {
    const state = reactive({
      title: "",
      todos: [],
    });

    const isLoading = ref(false);
    const fullPage = ref(true);

    const getTodos = async () => {
      isLoading.value = true;
      await axios
        .get(baseURL)
        .then((res) => {
          console.log(`Get Success! ${state.todos}`);
          setTimeout(() => {
            state.todos = res.data.resBody.slice().reverse();
            isLoading.value = false;
          }, 400);
        })
        .catch((err) => {
          console.error(err);
        })
    };

    const createTodo = async () => {
      if (state.title === "") {
        alert("TODOを入力してください")
      }
      else {
        await axios.put(baseURL, { title: state.title });
        state.title = "";
        getTodos()
      }
    };

    getTodos()

    return {
      isLoading,
      fullPage,
      state,
      createTodo,
      getTodos,
    };
  }
})
</script>
