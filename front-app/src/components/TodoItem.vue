<template>
  <main>
    <div class="py-2 container mx-auto">
      <div class="text-center w-1/2 inline-block top-0 py-2 font-bold bg-gray-500 text-white">Todo件数: {{ todos.length }}件</div><br/><br/>
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
            <td class="border title" v-bind:class="{ completed: completed }" @click="updateTodoStatus(id)">
              {{ title }}
            </td>
            <td class="border">
              <router-link :to="'/todo-edit?todoID='+id"
                class="px-12 py-3 m-1 font-bold rounded text-white bg-blue-300">
                Edit
              </router-link>
            </td>
            <td class="border">
              <button @click="deleteTodo(id)" class="px-12 py-3 m-1 font-bold rounded text-white bg-red-300">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { defineComponent, onUnmounted, ref } from 'vue';
import { db } from '../../../src/firebase/config'

export default ({
  name: "TodoItem",
  setup() {
    const todosCollection = db.collection('todos');
    const todos = ref(
      []
    );

    const getTodos = todosCollection.orderBy('creationTime', 'desc')
    .onSnapshot(snapshot => {
      todos.value = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
    })

    // Todoステータス変更()
    const updateTodoStatus = (todoID) => {
      todosCollection.doc(todoID).get().then
      (doc => {
        if (doc.exists) {
          doc.ref.update({
            completed: !doc.data().completed,
          }).then(() => {
            console.log(`${todoID}は正常に更新されました`)
          }).catch(err => {
            console.error(err);
          })
        }
        else {
          console.log("このTodoは更新できません")
        }

      })
    }

    // Todo削除
    const deleteTodo = (todoID) => {
      todosCollection.doc(todoID).get().then
      (doc => {
        if(doc.exists) {
          doc.ref.delete().then(()=> {
            console.log(`${todoID}は正常に削除されました`)
        }).catch(err => {
          console.error(err);
        })
        } else {
          console.log('このTodoは存在しません')
        }
      })
    }

    onUnmounted(getTodos);

    return {
      todosCollection,
      todos,
      getTodos,
      deleteTodo,
      updateTodoStatus,
    }
  }
});
</script>

<style>
.completed {
  text-decoration: line-through;
  color: rgb(200,200,200);
  cursor: pointer;
}
</style>
