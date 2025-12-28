import React from "react";

export default function TaskForm({
  title,
  setTitle,
  dueDate,
  setDueDate,
  editingId,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="card flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8"
    >
      <input
        className="border-b focus:outline-none focus:border-gray-600 focus:border-b-2 hover:border-gray-500"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border border-gray-400 rounded-lg"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button
        type="submit"
        className="btn bg-blue-500 mx-4 text-white rounded-xl hover:bg-blue-600"
      >
        {editingId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
