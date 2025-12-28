import React from "react";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="No-task">No tasks found</p>;
  }

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <div>
            <strong>{task.title}</strong>
            <div className="No-task">Due: {task.dueDate || "—"}</div>
          </div>

          <span className="bg-gray-200 rounded-lg p-2 m-auto">
            {task.status}
          </span>

          <div className="actions">
            <button onClick={() => onToggle(task.id)}>Toggle</button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-200 rounded-lg "
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
