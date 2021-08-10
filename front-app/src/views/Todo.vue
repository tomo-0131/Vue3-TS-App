<template>
  <div class="todo">
    <h1>TODO APP</h1>
    <div class="create">
      <div class="title">
        <label>タイトル: </label>
        <input  @keyup.enter="createTodo" v-model="state.title" placeholder="Todoを入力"/>
        <button @click="createTodo">Create</button>
      </div>
    </div>
    <br>

      <loading
        :active="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
      />

      <div class="todo-item" v-for="todo in state.todos" :key="todo.uuid">
        <input class="margin-r1" v-model="todo.title" />
        <select class="margin-r1" v-model="todo.status">
          <option value="todo">TODO</option>
          <option value="wip">処理中</option>
          <option value="done">完了</option>
        </select>
        <button class="update margin-r1" @click="updateTodo(todo)">Update</button>
        <button class="delete margin-r1" @click="deleteTodo(todo)">Delete</button>
      </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const baseURL = 'http://localhost:3000/';

type Todo = {
  uuid: string;
  title: string;
  status: 'todo' | 'wip' | 'done';
};

export default defineComponent({
  name: 'Todo',
  components: {
    Loading,
  },
  setup() {
    const state = reactive({
      title: '',
      todos: [],
    });

    const isLoading = ref(false);
    const fullPage = ref(true);

    const getTodos = async () => {
      isLoading.value = true;
      await axios.get(baseURL)
        .then((res) => {
          console.log(`Get Success! ${state.todos}`);
          setTimeout(() => {
            state.todos = res.data.resBody;
            isLoading.value = false
          }, 400)
        }).catch(err => {
          console.error(err);
        })
    }

    const createTodo = async () => {
      await axios.put(baseURL, { title: state.title })
      state.title = ''
      getTodos();
    };

    const updateTodo = async (todo: Todo) => {
      await axios.post(baseURL + todo.uuid, {
        title: todo.title,
        status: todo.status,
      })
      .catch(()=> {
        console.log("更新に失敗しました!!");
      })
      getTodos();
    }

    const deleteTodo = async (todo: Todo) => {
      await axios.delete(baseURL + todo.uuid);
      getTodos();
    }

    getTodos();

    return {
      isLoading,
      fullPage,
      state,
      getTodos,
      createTodo,
      updateTodo,
      deleteTodo,
    }
  }
})
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  @apply text-font-color;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.todo-item {
  display: flex;
  justify-content: center;

  .margin-r1 {
    margin-right: 1rem;
  }
}

.margin-r1 {
  margin-right: 1rem;
}

</style>
