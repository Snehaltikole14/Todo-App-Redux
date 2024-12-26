import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { addTodo, deleteTodo, getTodos, markAsDone } from "./slice/todoSlice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

function App() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const todosState = useSelector((state) => state.todos);

  useEffect(() => {
    if(todosState.staus === "idle"){
     dispatch(getTodos());
    }
  }, [todosState.status,dispatch]);

  function handleAddTodo() {
    // {id: nanoid() , todo: "Learn something new today", done: false}
    const todoObj = {
      id: nanoid(),
      todo: task,
      done: false,
    };

    dispatch(addTodo(todoObj));
    setTask("");
  }

if(todosState.status === "loading"){
    return <h1>Loading...</h1>;
}

if(todosState.status === "failed"){
  return <h1>{todosState.error}</h1>;
}

  return (
    <div className="bg-slate-600">
      <h1 className="text-center text-2xl font-bold text-slate-200">
        Worlds best to-do app
      </h1>
      <div className="flex justify-center items-center py-10 gap-8">
        <input
          type="text"
          placeholder="Enter Todo"
          className="px-8 py-4 rounded-md"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button
          className="border border-white px-8 py-4 rounded-md font-bold text-slate-200
        hover:bg-slate-500"
          onClick={() => handleAddTodo()}
        >
          Add To do
        </button>
      </div>
      <div className="flex justify-between w-full px-32 min-h-[70vh]">
        <div className="flex flex-col gap-4 w-1/2">
          {todosState.tasks.map((todo) => {
            if (!todo.done) {
              return (
                <TodoComponent
                  key={todo.id}
                  title={todo.todo}
                  id={todo.id}
                  done={todo.done}
                />
              );
            }
          })}
        </div>
        <div className="w-[1px] bg-slate-400 mx-4"></div>
        <div className="flex flex-col gap-4 w-1/2">
          {todosState.tasks.map((todo) => {
            if (todo.done) {
              return (
                <TodoComponent
                  key={todo.id}
                  title={todo.todo}
                  id={todo.id}
                  done={todo.done}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

function TodoComponent({ title, id, done }) {
  const dispatch = useDispatch();

  function handleDeleteTodo(id) {
    dispatch(deleteTodo(id));
  }

  function handleDone(id) {
    dispatch(markAsDone(id));
  }

  return (
    <div className="flex gap-8 text-slate-50 items-center">
      <p className="w-1/2">{title} </p>
      <button
        className={`${
          done
            ? " border-red-500 text-red-500"
            : "border-green-400 text-green-400"
        } 
        px-4 py-2 rounded-md font-bold 
        hover:bg-slate-500 border `}
        onClick={() => handleDone(id)}
      >
        {done ? "Mark as Incomplete" : "Mark as comeplete"}
      </button>
      <button
        className="border border-red-400 px-4 py-2 rounded-md font-bold text-red-400
        hover:bg-slate-500"
        onClick={() => handleDeleteTodo(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default App;
