import React, { useState } from "react";
import {
  DeleteIcon,
  EditIcon,
  CheckIcon,
  CancelIcon,
  CompleteIcon,
  CompleteBadgeIcon,
} from "../src/Icons";
const Task = ({ todo, deleteTodo, editTodo, confirmTodo }) => {
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
  const [confirmCompleteMode, setConfirmCompleteMode] = useState(false);
  const [editTaskMode, setEditTaskMode] = useState(false);
  const [editTaskInput, setEditTaskInput] = useState(todo.todo);
  const [showEditTask, setShowEditTask] = useState(false);
  // const editTodoDiv = document.querySelector(
  //   ".edit-mode .todo-task-description"
  // );

  const renderEditInput = () => {
    setTimeout(() => {
     
      // const editTodoInput = document.querySelector(
      //   ".edit-input"
      // );
      // console.log(editTodoInput)
      // editTodoInput.style.padding = "1rem";
      // editTodoDiv.style.padding = "0rem";
      setShowEditTask(true);
    }, 300);
  };

  // console.log(editTodoDiv.style.color = "red")
  // console.log(todo);
  const renderTodoTask = () => {
    if (confirmDeleteMode) {
      return (
        <div className="todo-task slide-left" key={todo._id}>
          <div className="todo-task-description">Confirm Delete?</div>
          <div className="todo-task-icons">
            <button onClick={() => deleteTodo(todo._id)}>
              <CheckIcon />
            </button>
            <button onClick={() => setConfirmDeleteMode(false)}>
              <CancelIcon />
            </button>
          </div>
        </div>
      );
    } else if (editTaskMode) {
      return (
        <div className="edit-mode todo-task slide-left" key={todo._id}>
          <div
            className={`todo-task-description ${
              showEditTask ? "edit-task" : ""
            }`}
          >
            {showEditTask ? (
              <input
                className="edit-input"
                type="text"
                value={editTaskInput}
                onChange={(e) => setEditTaskInput(e.target.value)}
              />
            ) : <div>
              { todo.todo }</div>}
          </div>
          <div className="todo-task-icons">
            <button
              onClick={() => {
                editTodo(todo._id, editTaskInput);
                setEditTaskMode(false);
                setShowEditTask(false);
              }}
            >
              <CheckIcon />
            </button>
            <button
              onClick={() => {
                setEditTaskMode(false);
                setShowEditTask(false);
              }}
            >
              <CancelIcon />
            </button>
          </div>
        </div>
      );
    } else if (confirmCompleteMode) {
      return (
        <div className="todo-task slide-left" key={todo._id}>
          <div className="todo-task-description">Confirm Complete?</div>
          <div className="todo-task-icons">
            <button
              onClick={() => {
                if (confirmTodo(todo._id)) {
                  setConfirmCompleteMode(false);
                }
              }}
            >
              <CheckIcon />
            </button>
            <button onClick={() => setConfirmCompleteMode(false)}>
              <CancelIcon />
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`todo-task ${todo.status === true ? "completed" : ""}`}
          key={todo._id}
        >
          <div className="todo-task-description">{todo.todo}</div>

          <div className="todo-task-icons">
            {todo.status === true ? (
              <CompleteBadgeIcon />
            ) : (
              <>
                <button onClick={() => setConfirmCompleteMode(true)}>
                  <CompleteIcon />
                </button>
                <button onClick={() => setConfirmDeleteMode(true)}>
                  <DeleteIcon />
                </button>
                <button
                  onClick={() => {
                    setEditTaskMode(true);
                    renderEditInput();
                  }}
                >
                  <EditIcon />
                </button>
              </>
            )}
          </div>
        </div>
      );
    }
  };
  return <>{renderTodoTask()}</>;
};

export default Task;
