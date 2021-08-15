<template>
  <h1>TODO APP</h1>
  <div class="container mx-auto">
    <div class="m-3 px-3 py-3 bg-gray-200 rounded-md shadow">
      <TodoInput />
    </div>
    <br />
    <loading :active="isLoading" :can-cancel="true" :is-full-page="fullPage" />
  </div>

  <!-- データ件数 -->
  <h4>{{ state.todos.length }}件</h4>

  <!-- Todoリストを表示 -->
  <button @click="moveTodoEdit">編集</button>

  <TodoItem
    v-for="item in state.todos"
    :key="item.uuid"
    :todo=item
    @update="moveTodoEdit"
    @delete="deleteTodo"
  />
</template>

<script lang="ts">
import router from "../router"
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import Loading from "vue-loading-overlay";
import TodoItem from '../components/TodoItem.vue';
import TodoInput from '../components/TodoInput.vue';

import "vue-loading-overlay/dist/vue-loading.css";

const baseURL = "http://localhost:3000/";

type Todo = {
  uuid: string;
  title: string;
  status: "todo" | "wip" | "done";
};

export default defineComponent({
  name: "Todo",
  components: {
    Loading,
    TodoItem,
    TodoInput,
  },

  setup() {
    const state = reactive({
      title: "",
      todos: [],
    });

    const isLoading = ref(false);
    const fullPage = ref(true);

    // 全データ取得
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

    const moveTodoEdit = async (todo: Todo) => {
      await router.push({ path: `/todo-edit/${todo.uuid}` })
    }

    // Todo Edit
    const updateTodo = async (todo: Todo) => {
      await axios
        .post(baseURL + todo.uuid, {
          title: todo.title,
          status: todo.status,
        })
        .catch(() => {
          console.log("更新に失敗しました!!");
        });
      getTodos();
    };

    // Todo Delete
    const deleteTodo = async (todo: Todo) => {
      // const deleteCheck = confirm("本当に消去してよいですか？");
      // if (deleteCheck === true) {
        await axios.delete(baseURL + todo.uuid);
        getTodos();
      // }
    };

    getTodos();

    return {
      isLoading,
      fullPage,
      state,
      getTodos,
      updateTodo,
      deleteTodo,
      moveTodoEdit,
    };
  },
});
</script>
