import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const nagivate = useNavigate();
  return (
    <div className="cards">
      <div
        className="card"
        onClick={() => {
          nagivate("/detail/:id");
        }}
      >
        <img
          src="https://t1.daumcdn.net/cfile/tistory/99E3FB425BAC760B1A"
          className="card__image"
          alt=""
        />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <div className="card__header-text">
              <h2 className="card__title">💛맛집이름</h2>
              <span className="card__tagline">🟡Title:제목</span>
              <span className="card__status">🟡Writer:작성자</span>
            </div>
          </div>
          <h3 className="card__description">클릭해서 자세히 보기</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
