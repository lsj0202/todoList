import React from "react";
import "./Header.css";

const Header = () => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  const date = new Date().toLocaleDateString("ko-KR", options);

  return (
    <div className="Header">
      <h3>오늘은 📅</h3>
      <h1>{date}</h1>
    </div>
  );
};

export default React.memo(Header);
