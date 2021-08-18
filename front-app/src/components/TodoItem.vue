<template>
  <main>
    <div class="borderpy-2 container mx-auto">
      {{ todos.length }}件<br/>
      <h1 class="font-bold rounded text-white bg-blue-300 border py-3">Todos</h1>
      <table class="table-fixed">
        <thead class="bg-gray-400 text-white">
          <tr class="containe mx-auto">
            <th class="w-1/2 border px-10 py-1 title">Title</th>
            <th class="w-1/2 border px-10 py-1 edit">Edit</th>
            <th class="w-1/2 border px-10 py-1 delete">Delete</th>
          </tr>
        </thead>
        <tbody class="container">
          <tr v-for="{ id, title, completed } in todos" :key="id">
            <td class="border title" v-bind:class="{ completed: completed }">
              {{ title }}
            </td>
            <td class="border">
              <router-link :to="'/todo-edit?todoID=' + id"
                class="px-12 py-3 m-1 font-bold rounded text-white bg-blue-300">
                Edit
              </router-link>
            </td>
            <td class="border">
              <button class="px-12 py-3 m-1 font-bold rounded text-white bg-red-300">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';
import { db } from '../../../src/firebase/config'

export default defineComponent({
  name: "TodoItem",
  setup() {
    const todosCollection = db.collection('todos')
    const todos = ref([]);

    const getTodos = todosCollection.orderBy('creationTime', 'asc')
    .onSnapshot(snapshot => {
      // console.log(snapshot.docs)

      todos.value = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
    })
    onUnmounted(getTodos);

    return {
      todosCollection,
      todos,
      getTodos,
    }
  },
});
</script>
