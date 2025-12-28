export const STORAGE_NAME = "mini-task-tracker";

const dummyTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Finish the task tracker project',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'pending'
  }, 
  {
    id: 2,
    title: 'Buy daily item',
    description: 'Milk, eggs, bread',
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: 'done'
  },
  
];

export function loadTasks() {
  try{
    const data = localStorage.getItem(STORAGE_NAME);
      return data ? JSON.parse(data) : dummyTasks;
    

  }
  catch(e){
    console.error("Error loading tasks:", e);
    return dummyTasks;
  }
}

export function saveTasks(tasks) {
  try{
    localStorage.setItem(STORAGE_NAME, JSON.stringify(tasks));

  }catch(e){
    console.error("Error saving tasks:", e);
  }
}