import todoSchema from "../models/todo_model.js"

// create todo 
export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = todoSchema({
            title,
            description
        })
        const todo = await newTodo.save()

        res.status(200).json({
            message: "Todo has created",
            data: {
                title: todo.title,
                description: todo.description,
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error,
        })
    }
}

// get all todos
export const getAllTodo = async (req, res) => {
    try {
        const todoList = await todoSchema.find({})

        res.status(200).json({
            message: `${todoList.length} items`, todoList
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error,
        })
    }
}

// update todo
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        await todoSchema.updateOne({ _id: id }, req.body)
        const todo = await todoSchema.findById(id)
        res.status(200).json({
            message: 'Todo updated',
            data: {
                title: todo.title,
                description: todo.description
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error,
        })
    }
}

// delete todo
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        await todoSchema.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Todo deleted',
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error,
        })
    }
}