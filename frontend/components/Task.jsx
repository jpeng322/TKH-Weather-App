import React, { useState } from "react";
import {
  DeleteIcon,
  EditIcon,
  CheckIcon,
  CancelIcon,
  CompleteIcon,
  CompleteBadgeIcon,
} from "../src/Icons";
// const Task = ({ todo, deleteTodo, editTodo, confirmTodo }) => {
//   const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
//   const [confirmCompleteMode, setConfirmCompleteMode] = useState(false);
//   const [editTaskMode, setEditTaskMode] = useState(false);
//   const [editTaskInput, setEditTaskInput] = useState(todo.todo);
//   const [showEditTask, setShowEditTask] = useState(false);

//   const renderEditInput = () => {
//     setTimeout(() => {
//       setShowEditTask(true);
//     }, 300);
//   };

//   const renderTodoTask = () => {
//     if (confirmDeleteMode) {
//       return (
//         <div className="todo-task slide-left" key={todo._id}>
//           <div className="todo-task-description">Confirm Delete?</div>
//           <div className="todo-task-icons">
//             <button onClick={() => deleteTodo(todo._id)}>
//               <CheckIcon />
//             </button>
//             <button onClick={() => setConfirmDeleteMode(false)}>
//               <CancelIcon />
//             </button>
//           </div>
//         </div>
//       );
//     } else if (editTaskMode) {
//       return (
//         <div className="edit-mode todo-task slide-left" key={todo._id}>
//           <div
//             className={`todo-task-description ${
//               showEditTask ? "edit-task" : ""
//             }`}
//           >
//             {showEditTask ? (
//               <input
//                 className="edit-input"
//                 type="text"
//                 value={editTaskInput}
//                 onChange={(e) => setEditTaskInput(e.target.value)}
//               />
//             ) : (
//               <div>{todo.todo}</div>
//             )}
//           </div>
//           <div className="todo-task-icons">
//             <button
//               onClick={() => {
//                 editTodo(todo._id, editTaskInput);
//                 setEditTaskMode(false);
//                 setShowEditTask(false);
//               }}
//             >
//               <CheckIcon />
//             </button>
//             <button
//               onClick={() => {
//                 setEditTaskMode(false);
//                 setShowEditTask(false);
//               }}
//             >
//               <CancelIcon />
//             </button>
//           </div>
//         </div>
//       );
//     } else if (confirmCompleteMode) {
//       return (
//         <div className="todo-task slide-left" key={todo._id}>
//           <div className="todo-task-description">Confirm Complete?</div>
//           <div className="todo-task-icons">
//             <button
//               onClick={() => {
//                 if (confirmTodo(todo._id)) {
//                   setConfirmCompleteMode(false);
//                 }
//               }}
//             >
//               <CheckIcon />
//             </button>
//             <button onClick={() => setConfirmCompleteMode(false)}>
//               <CancelIcon />
//             </button>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div
//           className={`todo-task ${todo.status === true ? "completed" : ""}`}
//           key={todo._id}
//         >
//           <div className="todo-task-description">{todo.todo}</div>

//           <div className="todo-task-icons">
//             {todo.status === true ? (
//               <CompleteBadgeIcon />
//             ) : (
//               <>
//                 <button onClick={() => setConfirmCompleteMode(true)}>
//                   <CompleteIcon />
//                 </button>
//                 <button onClick={() => setConfirmDeleteMode(true)}>
//                   <DeleteIcon />
//                 </button>
//                 <button
//                   onClick={() => {
//                     setEditTaskMode(true);
//                     renderEditInput();
//                   }}
//                 >
//                   <EditIcon />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       );
//     }
//   };
//   return <>{renderTodoTask()}</>;
// };

const Task = ({ todo, deleteTodoLocal, editTodoLocal, confirmTodoLocal }) => {
  const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);
  const [confirmCompleteMode, setConfirmCompleteMode] = useState(false);
  const [editTaskMode, setEditTaskMode] = useState(false);
  const [editTaskInput, setEditTaskInput] = useState(todo.todo);
  const [showEditTask, setShowEditTask] = useState(false);
  const [confirmCompleteAndDeleteMode, setConfirmCompleteAndDeleteMode] =
    useState(false);
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
            <button onClick={() => deleteTodoLocal(todo._id)}>
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
            ) : (
              <div>{todo.todo}</div>
            )}
          </div>
          <div className="todo-task-icons">
            <button
              onClick={() => {
                editTodoLocal(todo._id, editTaskInput);
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
                confirmTodoLocal(todo._id);
                // if (confirmTodoLocal(todo._id)) {
                setConfirmCompleteMode(false);
                // }
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
    } else if (confirmCompleteAndDeleteMode) {
      return (
        <div className="todo-task slide-left" key={todo._id}>
          <div className="todo-task-description">
            Confirm Delete Completed Task?
          </div>
          <div className="todo-task-icons">
            <button
              onClick={() => {
                deleteTodoLocal(todo._id);
                // if (confirmTodoLocal(todo._id)) {
                setConfirmCompleteAndDeleteMode(false);
                // }
              }}
            >
              <CheckIcon />
            </button>
            <button onClick={() => setConfirmCompleteAndDeleteMode(false)}>
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
              <button onClick={() => setConfirmCompleteAndDeleteMode(true)}>
                <CompleteBadgeIcon />
              </button>
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
