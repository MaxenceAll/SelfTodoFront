import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [tasks, setTasks] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken =cookies.AuthToken;
  const userEmail =cookies.Email;


  async function getData() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (authToken) getData();
  }, [authToken]);

  // console.log(tasks)

  //sort by date les tasks
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  // console.log(sortedTasks)

  return (<>

        {/* Si logged (authToken = true) */}
        {authToken &&
        <div className="app">
          <ListHeader listName={"🏝️ Todo list 3000 !"} getData={getData} />
          <p className="user-email">Welcome home  {userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem task={task} key={task.id} getData={getData} />
          ))}
        </div>
        }
        {!authToken &&
        <Auth />        
        }

        <p className="copyright">© Maxence ALLART</p>



  </>);
}

export default App;
