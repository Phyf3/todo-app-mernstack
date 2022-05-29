import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
const API_BASE = "https://tewdhew.herokuapp.com"


function App() {

  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState([]);

  useEffect(() => {
    GetAllTasks();
    console.log(todos)
    console.log(API_BASE + "/todos")
  }, [])

  const GetAllTasks = async () => {
    await fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(error => console.error("error in getalltasks",error))
  }

  const completeTask = async (id) => {
    const data = await fetch(API_BASE + '/todo/complete/' + id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        }})
      .then(res => res.json())
    .catch(error => console.log("Error in completing tasks :",error))
    
    setTodos(todos => todos.map(task => {
      if(task._id === data._id) {
        task.complete = data.complete
        if(task.complete === true) {
          console.log('Completed')
        } else {
          console.log("incomplete")
        }
      }
      return task
    }))
  }

  const deleteTask = async (id) => {
    const data = await fetch(API_BASE + '/todo/delete/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
    .catch(error => console.error("Error in deleting : ",error))
    console.log("deleted")
    setTodos(todos => todos.filter(task => task._id !== data._id))
  }


  const addTodo = async (id) => {
    const data = await fetch(API_BASE + '/todo/create', {
      method: 'POST',
      headers :{
        "Content-Type": "application/json"
      },
      body : JSON.stringify({
        text: newTodo
      })
    })
      .then(res => res.json())
    .catch(error => console.error("Error in adding data : ",error))
    console.log("created")

    console.log(data)
    setTodos([...todos, data]);
    setNewTodo("")
  }

  return (
    <div className="App">
      <h1>Welcome!</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos?.map(task => (
          <div 
            className={`todo ${task.complete ? "is-complete" : ""}`} key={task._id}
             >
            <div className="checkbox" onClick = {() => completeTask(task._id)}></div>
            <div className="text" onClick = {() => completeTask(task._id)}>{task.text}</div>
            <div className="delete-todo" onClick={() => deleteTask(task._id)}>X</div>
        </div>
        ))}
      </div>

      {popupActive ? <div className="addPopup" onClick={() => setPopupActive(!popupActive)} > x </div> :
      <div className="addPopup" onClick={() => setPopupActive(!popupActive)} > + </div>
      }
      <div className="addPopup" onClick={() => setPopupActive(!popupActive)} > </div>
        {
          popupActive ? 
            <div className="popup">
              <div className="closePopup"  onClick={() => setPopupActive(false)}>
                X
              </div>
              <div className="content">
                <h3>Add task</h3>
                <input type="text" className='add-todo-input'
                  onChange={e => setNewTodo(e.target.value)}
                  value={newTodo} 
                />
                <div className="button" onClick={addTodo} >Create Task</div>
              </div>
            </div>
           :
          ''
        }
      </div>
  );
}

export default App;
