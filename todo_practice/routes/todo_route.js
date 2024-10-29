import express from "express"
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todo_controller.js";

const router = express.Router()

router.post('/create_todo', createTodo);
router.get('/get_todo', getAllTodo);
router.patch('/update_todo/:id', updateTodo);
router.delete('/delete_todo/:id', deleteTodo);

export default router