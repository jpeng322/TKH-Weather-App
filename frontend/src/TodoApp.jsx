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
  console.log(task);
  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND}/todo`,
        data: {
          todo: task,
        },
      });

      if (response) {
        console.log(response);
        const newTodo = response.data;
        setTask("")
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
        url: `${import.meta.env.VITE_BACKEND}/todo`,
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

  const editTodo = async (id, todo) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_BACKEND}/todo`,
        data: {
          id,
          todo,
        },
      });

      if (response) {
        console.log(response);
        const editedTodo = response.data.editTodo;
        console.log(editedTodo);
        const newTodoList = todos.map((todo) => {
          if (todo._id === editedTodo._id) {
            return editedTodo;
          } else {
            return todo;
          }
        });
        setTodos(newTodoList);
      } else {
        throw Error("No response received.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const confirmTodo = async (id) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_BACKEND}/todo/status`,
        data: {
          id,
          status: true,
        },
      });

      if (response) {
        console.log(response);
        const confirmedTodo = response.data.confirmedTodo;
        console.log(confirmedTodo);
        const newTodoList = todos.map((todo) => {
          if (todo._id === confirmedTodo._id) {
            return confirmedTodo;
          } else {
            return todo;
          }
        });
        setTodos(newTodoList);
      } else {
        throw Error("No response received.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="todo-container">
      <header>
        <h1>Todo List</h1>
        <form onSubmit={(e) => createTodo(e)}>
          <input
            className="todo-input"
            onChange={(e) => setTask(e.target.value)}
            type="text"
            name="create-todo"
            value={task}
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
            <Task
              key={todo._id}
              deleteTodo={deleteTodo}
              todo={todo}
              editTodo={editTodo}
              confirmTodo={confirmTodo}
              className="tasktask"
            />
          );
        })}
      </main>
    </div>
  );
};

export default TodoApp;
