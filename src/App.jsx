import { useEffect, useState } from "react";
import { loadTasks, saveTasks } from "./mockApi.js";
import TaskForm from "./component/TaskForm";
import SearchAndFilter from "./component/SearchAndFilter";
import TaskList from "./component/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // setTasks(loadTasks());
    const getTasks = async () => {
      const data = await loadTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  function addOrUpdateTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    let updatedTasks;

    if (editingId) {
      updatedTasks = tasks.map((task) =>
        task.id === editingId ? { ...task, title, dueDate } : task
      );
      setEditingId(null);
    } else {
      updatedTasks = [
        ...tasks,
        { id: Date.now(), title, dueDate, status: "pending" },
      ];
    }

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTitle("");
    setDueDate("");
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function toggleStatus(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === "pending" ? "done" : "pending" }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function startEdit(task) {
    setTitle(task.title);
    setDueDate(task.dueDate);
    setEditingId(task.id);
  }

  let visibleTasks = tasks;

  if (filter !== "All") {
    visibleTasks = visibleTasks.filter((t) => t.status === filter);
  }

  if (search) {
    visibleTasks = visibleTasks.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortBy === "name") {
    visibleTasks = [...visibleTasks].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else {
    visibleTasks = [...visibleTasks].sort(
      (a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
    );
  }

  return (
    <div className="container ">
      <div className="bg-white rounded-lg p-8 w-full shadow-lg">
        <h1 className="text-center text-[30px] font-bold my-8 text-[#1F2937]">
          Mini Task Tracker
        </h1>

        <TaskForm
          title={title}
          setTitle={setTitle}
          dueDate={dueDate}
          setDueDate={setDueDate}
          editingId={editingId}
          onSubmit={addOrUpdateTask}
        />

        <SearchAndFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <div className="shadow-lg mt-4">
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleStatus}
          onEdit={startEdit}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
