import { useContext, useMemo, useState } from "react";
import { TodoStateContext, TodoDispatchContext } from "../App"; // 추가된 줄

import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = () => {
  const todo = useContext(TodoStateContext);
  const dispatch = useContext(TodoDispatchContext); // 추가된 줄

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((it) =>
          it.content.toLowerCase().includes(search.toLowerCase())
        );
  };

  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);

  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  // 추가된 함수
  const handleEdit = (id, updatedContent) => {
    dispatch({ type: "EDIT_TODO", payload: { id, content: updatedContent } });
  };

  return (
    <div className="TodoList">
      <h4 style={{ fontWeight: "600" }}>목록</h4>
      <div className="TodoDiv">
        <div className="Todos">
          총개수: <span style={{ color: "gray"}}>{totalCount}</span>
        </div>
        <div className="Todos">
          완료된 일:{" "}
          <span style={{ color: "rgb(0, 161, 0)" }}>{doneCount}</span>
        </div>
        <div className="Todos">
          아직 완료하지 못한 할 일:{" "}
          <span style={{ color: "red" }}>{notDoneCount}</span>
        </div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요"
      />
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem key={it.id} {...it} onEdit={handleEdit} /> // 수정된 줄
        ))}
      </div>
    </div>
  );
};

TodoList.defaultProps = {
  todo: [],
};

export default TodoList;
