import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Mypage from "../views/Mypage.vue";
import Todo from "../views/Todo.vue";
import TodoEdit from "../views/TodoEdit.vue";
import Welcome from "../views/Welcome.vue";
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/mypage",
		name: "Mypage",
		component: Mypage,
	},
	{
		path: "/about",
		name: "About",
		component: About,
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
	{
		path: "/welcome",
		name: "Welocome",
		component: Welcome,
	},
	{
		path: "/signup",
		name: "Signup",
		component: SignupForm,
	},
	{
		path: "/login",
		name: "Login",
		component: LoginForm,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
