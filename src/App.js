import "./App.css";
import React, { useMemo, useCallback, useReducer, useRef, useEffect } from "react";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId
          ? {
              ...it,
              isDone: !it.isDone,
            }
          : it
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    default:
      return state;
  }
}

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  const [todo, dispatch] = useReducer(reducer, [], (initial) => {
    const storedData = localStorage.getItem("todos");
    return storedData ? JSON.parse(storedData) : initial;
  });
  const idRef = useRef(3);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  const TodoList = () => {
    return (
      <div className="App">
        <Header />
        <TodoStateContext.Provider value={todo}>
          <TodoDispatchContext.Provider value={memoizedDispatches}>
            <TodoEditor />
            <TodoList />
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      </div>
    )
  }

  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
