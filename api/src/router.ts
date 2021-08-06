import { Router } from "express";

export const createRouter = () => {
	const router = Router();

	router.get("/", (req, res) => {
		res.status(200).send({
			message: "Hello World!! This is Express",
		});
	});
};
