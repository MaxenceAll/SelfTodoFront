import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(null);

  async function getData() {
    const userEmail = "maxence.allart@gmail.com";
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // console.log(tasks)

  //sort by date les tasks
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  // console.log(sortedTasks)

  return (
    <div className="app">
      <ListHeader listName={"🏝️ Todo list 3000 !"} getData={getData} />
      {sortedTasks?.map((task) => (
        <ListItem task={task} key={task.id} getData={getData} />
      ))}
    </div>
  );
}

export default App;
