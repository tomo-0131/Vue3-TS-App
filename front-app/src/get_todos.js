import "vue-loading-overlay/dist/vue-loading.css";
import axios from 'axios';
import { reactive, ref } from 'vue';

export const getTodos = async () => {
  const baseURL = "http://localhost:3000/";
  const state = reactive({
    title: "",
    todos: [],
  })
  const isLoading = ref(false);
  const fullPage = ref(true);

  isLoading.value = true;
  await axios
    .get(baseURL)
    .then((res) => {
      setTimeout(() => {
        state.todos = res.data.resBody.slice().reverse();
        isLoading.value = false;
        console.log(`Get Success! ${state.title}`);
      }, 400);
    })
    .catch((err) => {
      console.error(err);
    })
  return {
    baseURL,
    state,
    isLoading,
    fullPage,
    getTodos
  }
}
console.log(getTodos)
