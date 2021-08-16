import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Todo from "../views/Todo.vue";
import TodoEdit from "../views/TodoEdit.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		component: () => import("../views/About.vue"),
	},
	{
		path: "/todo",
		name: "Todo",
		component: Todo,
	},
	{
		path: "/todo-edit/:id",
		name: "TodoEdit",
		component: TodoEdit,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
