import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import todo from "../../backend/models/todo";
import axios from "axios";
import { EditIcon, DeleteIcon } from "./Icons";
import "./CSS/Todo.css";
const TodoApp = () => {
  const listOfTodos = useLoaderData();
  const [todos, setTodos] = useState(listOfTodos);
  const [task, setTask] = useState("");
  console.log(todos);
  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:4000/todo`,
        data: {
          todo: task,
        },
      });

      if (response) {
        console.log(response);
        const newTodo = response.data;
        setTodos([...todos, newTodo]);
      } else {
        throw Error("No response received.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(todos);
  return (
    <div className="todo-container">
      <header>
        <h1>Todo App</h1>
        <form onSubmit={(e) => createTodo(e)}>
          <input
            className="todo-input"
            onChange={(e) => setTask(e.target.value)}
            type="text"
            name="create-todo"
          />
          {/* <label htmlFor="create-todo">Create Todo</label> */}
          <button className="add-todo-button" type="submit">
            Add Todo
          </button>
        </form>
      </header>
      <main className="todo-task-container">
        {todos.map((todo) => {
          return (
            <div className="todo-task" key={todo._id}>
              <div className="todo-task-description">{todo.todo}</div>
              <div className="todo-task-icons">
                <DeleteIcon />
                <EditIcon />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default TodoApp;
