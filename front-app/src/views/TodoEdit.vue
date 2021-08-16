<template>
  <h1> TODO編集 </h1>
  {{ state.title }}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type Todo = {
  uuid: string;
  title: string;
  status: 'todo' | 'wip' | 'done';
};

export default defineComponent({
  name: "TodoEdit",
  props: {
    todo: {
      type: Object as PropType<Todo>,
      default: null,
    },
  },
  setup(props) {
    const state = {
      task: JSON.parse(JSON.stringify(props.todo)),
    };
    return {
      state,
    }
  }
})
</script>

<style>

</style>
