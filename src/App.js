import React, { useEffect, useState } from "react";
import './App.css'

const Displaytodo = ({ title, desc, id ,deleteItem}) => {
  return (
    <div className="displayItem">
      <p>{title + " : "+ desc}</p>
      <button className="deletebtn" onClick = {()=>{
          deleteItem(id);
        }}>x</button>
    </div>
  );
};

const App = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const search=(event)=>{
    if(event.target.value){

      let filteredlist =tasklist.filter((obj) => obj.task.toLowerCase().includes( event.target.value.toLowerCase()));
       setDisplayList([...filteredlist])
    }
    else{
      setDisplayList([...tasklist])
    }
  }

  const addtask = () => {
    if (title && desc) {
      let obj = {
        key: tasklist.length + 1,
        task: title,
        desc: desc,
      };
      
      setDesc("");
      setTitle("")
      setTaskList([obj,...tasklist]);
      // console.log(tasklist)
      // console.log(obj)
      document.getElementById('search').value="";
      // console.log("adddes");
    }
  };

  const deleteTask=(key)=>{
      // Filter out the objects whose "key" field does not match the provided key
      const filteredArray = tasklist.filter((obj) => obj.key !== key);
      setTaskList([...filteredArray]);
      // saveDataToLocalStorage(tasklist,"data");
    };
  
  const saveDataToLocalStorage = (data, key) => {
    try {
      // Convert the data to JSON before saving to local storage
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      // console.log('Data saved to local storage successfully.');
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  };

  const LoadDataFromLocalStorage = (key) => {
    try {
      const userdata = JSON.parse(localStorage.getItem(key));
      if(userdata)
      {
        return userdata;
      }else{
        return [];
      }
        
    } catch (error) {
      console.error('Error in loading data', error);
    }
  };

  const [tasklist, setTaskList] = useState(LoadDataFromLocalStorage('data'));

   const [list, setDisplayList] = useState(LoadDataFromLocalStorage('data'));
   useEffect(() => {
    const loadedData = LoadDataFromLocalStorage('data') || [];
    setTaskList(loadedData);
    }, []);
    useEffect(()=>{
    
      // console.log(tasklist)
      setDisplayList([...tasklist]);
      saveDataToLocalStorage(tasklist,"data");
    },[tasklist]);


  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="middle">
      <input id="search" type="text" placeholder="Search" onChange={(e)=>{
          search(e);  }}/>
      <div className="displaybox">
      {
        list.length>0?
      list.map((elem, idx) => {
        return (
          <Displaytodo
            deleteItem={deleteTask}
            key={idx}
            title={elem.task}
            desc={elem.desc}
            id={elem.key}
          />
        );
      }):<h3 className="empty">No Results 😢</h3>
      }</div>
      </div>

      <div className="footer">
        <h2>Add Todo</h2>
        <div className="addtodo">
        <div className="addinputs">
        <input
          className="input"
          value={title}
          type="text"
          placeholder="add new todo title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        &nbsp;
        <input
        className="input"
          value={desc}
          type="text"
          placeholder="add new todo description"
          onChange={(event) => {
            setDesc(event.target.value);
          }}
        />
        </div>
        <button
          className="addbtn"
          onClick={() => {
            addtask();
          }}>
          +
        </button>
      </div>
      </div>

    </div>
  );
};


export default App;
