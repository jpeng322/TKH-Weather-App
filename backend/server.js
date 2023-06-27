import express from "express";
import mongoose from "mongoose";
import Todo from "./models/todo.js";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("connected to mongo"));

app.get("/", (req, res) => {
  res.send("GET RESP");
});

app.post("/todo", async (req, res) => {
  console.log(req.body);
  try {
    const todo = new Todo(req.body);
    console.log(todo, "POST REUQST");
    await todo.save();

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(400).json({ mssg: "empty object" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/todo", async (req, res) => {
  try {
    //find all users that are not yourself ...
    const listOfTodos = await Todo.find();
    console.log(listOfTodos);

    if (listOfTodos) {
      res.status(200).json({
        listOfTodos,
        success: true,
      });
    } else {
      res.status(400).json({ success: false, message: "No todos found" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.delete("/todo", async (req, res) => {
  console.log();
  const { id } = req.body;
  try {
    //find all users that are not yourself ...
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (deleteTodo) {
      res.status(200).json({
        deleteTodo,
        success: true,
      });
    } else {
      res.status(400).json({ success: false, message: "No todo deleted" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/todo", async (req, res) => {
  console.log(req.body);
  const { id, todo } = req.body;
  try {
    //find all users that are not yourself ...
    const editTodo = await Todo.findByIdAndUpdate(
      id,
      {
        todo,
      },
      { new: true }
    );
    console.log(editTodo);
    if (editTodo) {
      res.status(200).json({
        editTodo,
        success: true,
      });
    } else {
      res.status(400).json({ success: false, message: "No todo edited" });
    }
  } catch (e) {
    console.log(e.message);
  }
});


app.put("/todo/status", async (req, res) => {
  console.log(req.body);
  const { id, status } = req.body;
  try {
    //find all users that are not yourself ...
    const confirmedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );
    console.log(confirmedTodo);
    if (confirmedTodo) {
      res.status(200).json({
        confirmedTodo,
        success: true,
      });
    } else {
      res.status(400).json({ success: false, message: "No todo edited" });
    }
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server listening on ${process.env.PORT || 4000}, connected to server ${
      process.env.MONGODB_URI || "MONGODB SERVER"
    }`
  );
});
