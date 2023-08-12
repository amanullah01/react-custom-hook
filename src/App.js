import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./Hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const taskTrasnform = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  };

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(
    {
      url: "https://react-http-request-test-12f89-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    },
    taskTrasnform
  );

  useEffect(() => {
    console.log("use effect fetch task initial");
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    console.log("add task loading");
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
