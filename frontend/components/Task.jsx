import React, { useState } from "react";
import { DeleteIcon, EditIcon, CheckIcon, CancelIcon } from "../src/Icons";
const Task = ({ todo, deleteTodo }) => {
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
  const [editTaskMode, setEditTaskMode] = useState(false);
  const [editTaskInput, setEditTaskInput] = useState(todo.todo);
  const [showEditTask, setShowEditTask] = useState(false);

  const renderEditInput = () => {
    setTimeout(() => {
      setShowEditTask(true);
    }, 300);
  };
  const renderTodoTask = () => {
    if (confirmDeleteMode) {
      return (
        <div className="todo-task slide-left" key={todo._id}>
          <div className="todo-task-description">Confirm Delete?</div>
          <div className="todo-task-icons">
            {/* <button onClick={() => deleteTodo(todo._id)}> */}
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
          <div className="todo-task-description">
            {showEditTask && (
              <input
                type="text"
                value={editTaskInput}
                onChange={(e) => setEditTaskInput(e.target.value)}
              />
            )}
          </div>
          <div className="todo-task-icons">
            {/* <button onClick={() => deleteTodo(todo._id)}> */}
            <button onClick={() => deleteTodo(todo._id)}>
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
    } else {
      return (
        <div className="todo-task" key={todo._id}>
          <div className="todo-task-description">{todo.todo}</div>
          <div className="todo-task-icons">
            {/* <button onClick={() => deleteTodo(todo._id)}> */}
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
          </div>
        </div>
      );
    }
  };
  return (
    <>
      {renderTodoTask()}
      {/* {confirmDeleteMode ? (
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
      ) : (
        <div className="todo-task" key={todo._id}>
          <div className="todo-task-description">{todo.todo}</div>
          <div className="todo-task-icons">
            <button onClick={() => setConfirmDeleteMode(true)}>
              <DeleteIcon />
            </button>
            <button onClick={() => deleteTodo(todo._id)}>
              <EditIcon />
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Task;
