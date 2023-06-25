import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const dateId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dateId.current,
    };
    dateId.current++;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    console.log(`${targetId}번 게물이 삭제되었습니다.`);
    const newDiaryList = data.filter((ele) => (
      ele.id !== targetId
    ));
    console.log(newDiaryList);
    setData(newDiaryList);
  }

  return (
    <div>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
