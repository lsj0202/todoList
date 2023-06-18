import { useState, useRef } from "react";
import "./App.css";

export default function DiaryEditor({ onCreate }) {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.author.length < 1) {
      // focus
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      // focus
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  console.log(state.emotion);
  return (
    <div className="diary">
      <div>
        <h2>오늘의 일기</h2>
        <div>
          <input
            ref={authorInput}
            name="author"
            onChange={handleChangeState}
            value={state.author}
          />
        </div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      오늘의 감정점수 :
      <select name="emotion" value={state.emotion} onChange={handleChangeState}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <br />
      <button onClick={handleSubmit}>일기 저장하기</button>
    </div>
  );
}
