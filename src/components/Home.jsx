import { useEffect, useState } from "react"
import Task from "./Task"

export const Home = () => {
  const inputArray=localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
  const [tasks,setTasks]=useState(inputArray);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
    const submitHandler=(e)=>{
        e.preventDefault();
        setTasks([...tasks,{title,description}]);
        setTitle("");
        setDescription("");


    }
    const deleteTask=(index)=>{
        const newArray=tasks.filter((val,i)=>{
            return i!==index;
        })
        setTasks(newArray);
    };
    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasks));

    }, [tasks])
    
  return (
    <div className="container">
      <h1>DAILY GOALS</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Enter title ' value={title} onChange={(e)=>{
            setTitle(e.target.value)
        }} />
        <textarea placeholder='Enter description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button type='submit'>ADD</button>
      </form>
      {tasks.map((item,index)=>(
          <Task key={index} title={item.title} description={item.description}
            deleteTask={deleteTask}
            index={index}
          
          />

      ))}  
       
    </div>
  )
}
