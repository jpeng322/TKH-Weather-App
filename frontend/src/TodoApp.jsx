import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

//icons
import { EditIcon, DeleteIcon } from "./Icons";

//styling
import "./CSS/Todo.css";

//components
import Task from "../components/Task";
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

  const deleteTodo = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:4000/todo`,
        data: {
          id,
        },
      });

      if (response) {
        const deletedTodo = response.data.deleteTodo;
        const newTodoList = todos.filter(
          (todo) => todo._id !== deletedTodo._id
        );
        setTodos(newTodoList);
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
          return <Task deleteTodo={deleteTodo} todo={todo} />;
        })}
      </main>
    </div>
  );
};

export default TodoApp;
