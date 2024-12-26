import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getTodos =createAsyncThunk("todo/getTodos", async () => {
  const res = await fetch("https://dummyjson.com/todos");
  const data =await res.json();
  return data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
    status: "idle", // loading, idle
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTodo: (state, action) => {
      const id = action.payload;
     state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    markAsDone: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log(action.payload.todos);
        state.tasks = action.payload.todos;
        state.status = "not-loading";
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "false";
        state.error = "Error while fetching todos.";
      });
  },
});

export const { addTodo, deleteTodo, markAsDone } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
